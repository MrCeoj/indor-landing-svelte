<script lang="ts">
	import { goto } from '$app/navigation';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let {images} = $props()

	// --- Default Images ---
	const defaultImages = [
		'/image/Banner1.jpeg',
		'/image/Banner2.jpeg',
	];

	// --- Existing Carousel Logic ---
	let currentImageIndex = $state(0);
	let isTransitioning = $state(false);

	function updateCarousel(newIndex: number) {
		if (isTransitioning || images.length === 0) return;
		isTransitioning = true;
		currentImageIndex = newIndex;
		setTimeout(() => (isTransitioning = false), 700);
	}

	function nextImage() {
		if (images.length === 0) return;
		updateCarousel((currentImageIndex + 1) % images.length);
	}

	function prevImage() {
		if (images.length === 0) return;
		updateCarousel((currentImageIndex - 1 + images.length) % images.length);
	}

	onMount(() => {
		const interval = setInterval(nextImage, 3000);
		return () => clearInterval(interval);
	});
</script>

<section class="relative px-4 pt-20 pb-0 md:pt-26 md:pb-8">
	<div class="relative z-10 mx-auto max-w-7xl">
		<div class="grid items-center gap-16 sm:grid-cols-2">
			<!-- Left -->
			<div class="space-y-8">
				<div
					class="inline-block rounded-full border border-orange-500/30 bg-orange-600/20 px-6 py-3 text-sm font-bold tracking-wide text-orange-400 uppercase"
				>
					⚡ Social Club & Sports Bar
				</div>

				<h1
					class="font-Nord text-3xl leading-tight font-extrabold text-white sm:text-2xl md:text-4xl lg:text-5xl"
				>
					Todo en un
					<span
						class="mt-2 block bg-linear-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent"
					>
						mismo lugar
					</span>
				</h1>

				<p class="max-w-lg text-base leading-relaxed text-gray-300 md:text-base lg:text-xl">
					En Indor Club, combinamos lo mejor del pádel, la gastronomía y el entretenimiento en un
					solo lugar.
				</p>

				<div class="flex flex-wrap gap-4 pt-4">
					<!-- Glow Button -->
					<button
						onclick={() => {
							goto('/reservaciones');
						}}
						class="relative overflow-hidden rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-orange-600/50 transition-transform duration-300 before:absolute before:inset-0 before:-left-full before:bg-linear-to-r before:from-transparent before:via-amber-500/30 before:to-transparent before:transition-all before:duration-500 hover:scale-105 hover:shadow-orange-600/80 hover:before:left-full focus:scale-105 focus:before:left-full lg:px-8 lg:py-4 lg:text-lg"
					>
						<span class="relative z-10">Reserva con nosotros</span>
					</button>

					<a
						tabindex={0}
						href="/servicios"
						class="rounded-xl border-2 border-orange-500/50 px-4 py-3 text-sm font-semibold text-orange-400 backdrop-blur-sm transition-all duration-300 outline-none hover:border-orange-500 hover:bg-orange-500/10 focus:border-orange-500 focus:bg-orange-500/10 lg:text-lg"
					>
						Ver más
					</a>
				</div>

				<!-- Stats -->
				<div class="flex gap-8 pt-4 md:pt-8">
					<div>
						<div class="text-2xl font-bold text-orange-400 md:text-3xl lg:text-4xl">8</div>
						<div class="text-sm text-gray-400 lg:text-base">Canchas</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-orange-400 md:text-3xl lg:text-4xl">500+</div>
						<div class="text-sm text-gray-400 lg:text-base">Jugadores</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-orange-400 md:text-3xl lg:text-4xl">Café &</div>
						<div class="text-sm text-gray-400 lg:text-base">Restaurante</div>
					</div>
				</div>
			</div>

			<!-- Right - Carousel -->
			<div class="relative overflow-visible">
				<div
					class="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black shadow-2xl shadow-orange-600/20 md:aspect-square"
				>
					{#each images as image, index}
						<img
							src={image}
							alt="Indor Club"
							loading="lazy"
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
						{#each images as _, index}
							<button
								aria-label="Pasar Imagen"
								onclick={() => updateCarousel(index)}
								class={`rounded-full transition-all duration-300 ${
									index === currentImageIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/50'
								} h-2`}
							></button>
						{/each}
					</div>
				</div>

				<!--Glow Orb-->
				<div
					class="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-amber-500/20 blur-2xl"
				></div>
			</div>
		</div>
	</div>
</section>
