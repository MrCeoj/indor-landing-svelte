<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import Marquee from '$lib/components/Marquee.svelte';
	import '@selemondev/svelte-marquee/dist/style.css';

	let { events } = $props();

	const LOOP_MULTIPLIER = 6;
</script>

<div in:scale class="my-8 space-y-6 px-2 text-center">
	<h2 class="text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
		Únetenos en nuestros
		<span class="inline bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
			próximos
		</span>
		<span class="inline bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
			eventos.
		</span>
	</h2>
</div>
<div in:fade class="relative flex w-full justify-center overflow-hidden [--duration:10s]">
	<Marquee>
		{#each events as e}
			<div
				class="relative h-[350px] md:h-[450px]"
				style="width: {e.width ? `${e.width}px` : 'auto'}; aspect-ratio: {e.aspectRatio || '12/16'}"
			>
				<img
					in:scale
					src={e.url}
					alt={e.alt || 'event-banner'}
					class="h-full w-auto rounded-xl object-cover shadow-lg"
					draggable="false"
				/>
			</div>
		{/each}
	</Marquee>
</div>

<style>
	div::-webkit-scrollbar {
		display: none;
	}
</style>
