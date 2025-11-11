<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { carouselImages }: { carouselImages: string[] } = $props();

	let currentImageIndex = $state(0);
	let isTransitioning = $state(false);

	function updateCarousel(newIndex: number) {
		if (isTransitioning || carouselImages.length === 0) return;
		isTransitioning = true;
		currentImageIndex = newIndex;
		setTimeout(() => (isTransitioning = false), 700);
	}

	function nextImage() {
		if (carouselImages.length === 0) return;
		updateCarousel((currentImageIndex + 1) % carouselImages.length);
	}

	function prevImage() {
		if (carouselImages.length === 0) return;
		updateCarousel((currentImageIndex - 1 + carouselImages.length) % carouselImages.length);
	}

	onMount(() => {
		const interval = setInterval(nextImage, 3000);
		return () => clearInterval(interval);
	});
</script>

<div
	class="relative aspect-video w-full overflow-hidden rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black shadow-2xl shadow-orange-600/20 md:aspect-square lg:aspect-16/11"
>
	{#each carouselImages as image, index}
		<img
			src={image}
			alt="Indor Club"
			loading="lazy"
			fetchpriority="high"
			class="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out"
			style="opacity: {index === currentImageIndex ? 1 : 0}; transform: scale({index ===
			currentImageIndex
				? 1
				: 1.05})"
		/>
	{/each}

	<!-- Nav Buttons -->
	<button
		onclick={prevImage}
		aria-label="Imagen Anterior"
		class="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/40 px-1 py-3 text-2xl font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-orange-500 focus:scale-110 focus:bg-orange-500"
	>
		<ChevronLeft size={12} strokeWidth={4} />
	</button>

	<button
		onclick={nextImage}
		aria-label="Siguiente Imagen"
		class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/40 px-1 py-3 text-2xl font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-orange-500 focus:scale-110 focus:bg-orange-500"
	>
		<ChevronRight size={12} strokeWidth={4} />
	</button>

	<!-- Indicators -->
	<div class="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
		{#each carouselImages as _, index}
			<button
				aria-label="Pasar Imagen"
				onclick={() => updateCarousel(index)}
				class={`rounded-full transition-all duration-300 ${index === currentImageIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/50'} h-2`}
			></button>
		{/each}
	</div>
</div>
