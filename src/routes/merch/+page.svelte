<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Sparkles, Check } from 'lucide-svelte';
	import IndorLogoText from '$lib/components/IndorLogoText.svelte';
	import type { PageData } from '../$types';

	let { data } = $props<{ data: PageData }>();
	const merchItems = $derived(data.merchItems);

	let scrollContainer: HTMLDivElement;
	let autoScrollInterval: number;
	let isPaused = $state(false);

	const LOOP_MULTIPLIER = 6;
	const infiniteMerchItems = $derived(Array(LOOP_MULTIPLIER).fill(merchItems).flat());

	onMount(() => {
		startAutoScroll();
		return () => clearInterval(autoScrollInterval);
	});

	function startAutoScroll() {
		autoScrollInterval = setInterval(() => {
			if (!isPaused && scrollContainer) {
				const scrollAmount = 1;
				scrollContainer.scrollLeft += scrollAmount;

				const scrollWidthHalf = scrollContainer.scrollWidth / 2;
				
				if (scrollContainer.scrollLeft >= scrollWidthHalf) {
					scrollContainer.scrollLeft = 0;
				}

				if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
					scrollContainer.scrollLeft = 0;
				}
			}
		}, 30) as unknown as number;
	}

	function pauseScroll() {
		isPaused = true;
	}

	function resumeScroll() {
		isPaused = false;
	}

	onMount(() => {
		startAutoScroll();
		invalidate('/merch');
		return () => clearInterval(autoScrollInterval);
	});
</script>

<Navbar />
<!-- Hero -->
<section
	class="relative mb-12 overflow-hidden border-b-2 border-b-amber-500/10 px-4 pt-32 pb-8 text-center"
>
	<div class="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl"></div>
	<div class="absolute top-40 right-1/4 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl"></div>
	<div class="relative z-10 mx-auto max-w-4xl">
		<div
			class="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-600/20 px-6 py-2 text-sm font-bold tracking-widest text-orange-400 uppercase"
			in:fade={{ duration: 600 }}
		>
			Nueva Colección
		</div>
		<h1
			class="mb-6 flex flex-col justify-center bg-linear-to-r from-amber-200 to-orange-400 bg-clip-text font-Nord text-5xl font-extrabold text-transparent"
			in:fade={{ delay: 200, duration: 600 }}
		>
			<span> Vístete con el espíritu </span>
			<span class="mt-4 flex w-full justify-center">
				<IndorLogoText size="huge" />
			</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-gray-300" in:fade={{ delay: 400, duration: 600 }}>
			Explora nuestra línea exclusiva de ropa y accesorios diseñados para quienes viven el deporte
			con pasión y estilo.
		</p>
	</div>
</section>

<section in:fade id="productos" class="relative w-full pb-20">
	<div class="absolute top-1/2 left-10 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl"></div>
	<div class="relative z-10 mx-auto max-w-6xl">
		<h2 class="mb-10 text-center font-Nord text-3xl font-bold text-white lg:text-4xl">
			Nuestros Productos
		</h2>
	</div>
	<div class="relative w-full overflow-hidden">
		<div
			bind:this={scrollContainer}
			onmouseenter={pauseScroll}
			onmouseleave={resumeScroll}
			ontouchstart={pauseScroll}
			ontouchend={resumeScroll}
			role="banner"
			class="flex w-full gap-6 overflow-x-auto scroll-smooth p-8"
			style="scrollbar-width: none; -ms-overflow-style: none;"
		>
			{#each infiniteMerchItems as item (item.titulo + Math.random())}
				<div
					class=" group relative max-w-min min-w-[80%] overflow-hidden rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black shadow-xl shadow-orange-600/20 transition-transform duration-300 hover:scale-105 sm:min-w-[35%] md:min-w-[25%]"
				>
					<div class="aspect-square overflow-hidden">
						<img
							loading="lazy"
							src={item.imagenes[0]}
							alt={item.titulo}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
					</div>
					<div class="flex-col space-y-4 p-6 pb-12">
						<h3 class="text-2xl font-semibold text-white">{item.titulo}</h3>
						<p class="text-sm text-gray-300">{item.richtext.description}</p>
						<ul class="md:max-w-[80%] space-y-1 text-sm text-wrap text-gray-400">
							{#each item.richtext.features as feature}
								<li class="flex items-center gap-2">
									<Check size={14} class="text-orange-400" />
									{feature}
								</li>
							{/each}
						</ul>
						<div class="absolute right-6 bottom-4 w-full text-right">
							<span class="text-xl font-bold text-orange-400">${item.precio} MXN</span>
						</div>
					</div>
				</div>
			{/each}
			<div
				class="pointer-events-none absolute inset-y-0 left-0 w-full bg-linear-[90deg,#242424,transparent_15%,transparent_85%,#242424]"
			></div>
		</div>
	</div>
</section>

<!-- Quality Section -->
<section class="relative overflow-hidden px-4 pb-24 text-center">
	<div
		class="absolute inset-0 bg-linear-to-b from-transparent via-orange-600/10 to-transparent"
	></div>
	<div class="relative z-10 mx-auto max-w-3xl">
		<Sparkles class="mx-auto mb-4 text-orange-400" size={48} />
		<h2 class="mb-4 font-Nord text-4xl font-bold text-white">Calidad que se siente</h2>
		<p class="text-xl font-semibold text-gray-300">
			No es solo merch, es una declaración de pertenencia.
		</p>
	</div>
</section>

<Footer />

<svelte:head>
	<title>Nuestra Merch | Indor Club</title>
	<meta
		name="description"
		content="
		¡Nuestros mejores productos de pertenencia al club! Compra camisetas, gorras y demás artículos
		para demostrar tu amor por Indor Club"
	/>
</svelte:head>

<style>
	div::-webkit-scrollbar {
		display: none;
	}
</style>
