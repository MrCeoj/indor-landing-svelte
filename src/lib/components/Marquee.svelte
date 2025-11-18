<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { tick } from 'svelte';

	gsap.registerPlugin(Draggable);

	let { speed = 100, children } = $props();
	let container: HTMLDivElement | null = $state(null);
	let killFns: (() => void)[] = [];

	onMount(async () => {
		await tick();

		if (!container) return;

		const track = container.querySelector('.track') as HTMLElement;
		const items = Array.from(track.children) as HTMLElement[];

		if (items.length === 0) return;

		const images = track.querySelectorAll('img');
		if (images.length > 0) {
			await Promise.all(
				Array.from(images).map((img) => {
					if (img.complete) return Promise.resolve();
					return new Promise((resolve) => {
						img.addEventListener('load', resolve);
						img.addEventListener('error', resolve);
					});
				})
			);
		}

		const containerWidth = container.offsetWidth;
		const originalWidth = items.reduce((s, el) => s + el.offsetWidth, 0);

		// 3. FIX: Cloning logic
		// We must append an exact copy of the original items for the loop
		items.forEach((el) => {
			track.appendChild(el.cloneNode(true));
		});

		// 4. FIX: Handle gaps if content is shorter than the viewport
		// Keep adding clones until the track is at least containerWidth + originalWidth
		let totalWidth = originalWidth * 2;
		while (totalWidth < containerWidth + originalWidth) {
			items.forEach((el) => {
				track.appendChild(el.cloneNode(true));
			});
			totalWidth += originalWidth;
		}

		// 5. FIX: Removed the 'modifiers' from the timeline.
		// The seamless repeat handles the loop.
		const tl = gsap.to(track, {
			x: -originalWidth,
			duration: originalWidth / speed,
			ease: 'none',
			repeat: -1
		});

		const draggables = Draggable.create(track, {
			type: 'x',
			inertia: true,
			onPress() {
				tl.pause();
			},
			onDrag() {
				let wrappedX = gsap.utils.wrap(-originalWidth, 0)(this.x);
				gsap.set(track, { x: wrappedX });
			},
			onRelease() {
				tl.seek(Math.abs((gsap.getProperty(track, 'x') as number) / -originalWidth) * tl.duration());
				tl.play();
			}
		});

		killFns.push(() => {
			tl.kill();
			draggables.forEach((d) => d.kill());
		});
	});

	onDestroy(() => {
		killFns.forEach((fn) => fn());
		killFns = [];
	});
</script>

<div in:fade class="content" bind:this={container}>
	<div class="track">
		{@render children()}
	</div>
</div>

<style>
	.content {
		position: relative;
		width: full;
		max-width: 80rem;
		cursor: grab;
		mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 95%, transparent);
	}

	.content:active {
		cursor: grabbing;
	}

	.track {
		display: flex;
		gap: 1rem;
		white-space: nowrap;
		will-change: transform;
	}
</style>
