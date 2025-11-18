<script>
	import { goto } from '$app/navigation';
	import { Medal, UtensilsCrossed, Coffee, Tv } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let items = [
		{
			icon: Medal,
			title: 'Pádel',
			description:
				'Canchas de última generación, Clases personalizadas y clínicas para niños. ¡Juega, aprende y disfruta!',
			link: '/reservaciones',
			linkText: 'Reservar ahora →',
			delay: 100
		},
		{
			icon: UtensilsCrossed,
			title: 'Restaurante',
			description:
				'Gastronomía de autor y ambiente premium. Ideal para después del partido o cenas exclusivas.',
			link: '/servicios/#takeabreak',
			linkText: 'Explorar más →',
			delay: 300
		},
		{
			icon: Coffee,
			title: 'Café & Lounge',
			description:
				'Un espacio relajado con café artesanal, snacks saludables y un ambiente diseñado para compartir.',
			link: '/servicios/#buenvicio',
			linkText: 'Explorar más →',
			delay: 400
		},
		{
			icon: Tv,
			title: 'Sports Bar',
			description:
				'Una pantalla gigante con transmisiones deportivas internacionales en vivo, con barra de mixología deluxe.',
			link: '/servicios/#streaming',
			linkText: 'Explorar más →',
			delay: 500
		}
	];
</script>

<section class="relative px-4 py-20 text-white">
	<!-- Background Glow Orbs -->
	<div class="absolute top-20 left-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"></div>
	<div class="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="mb-16 space-y-6 px-2 text-center">
			<h2 class="mb-6 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
				Te ofrecemos una experiencia completa ideal para compartir
				<span
					class="inline bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
				>
					en familia
				</span>
				o
				<span
					class="inline bg-linear-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"
				>
					en buena compañía.
				</span>
			</h2>
		</div>

		<!-- Services Grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 place-items-center mx-auto">
			{#each items as item}
				<button
					in:slide={{ delay: item.delay, duration: 600 }}
					onkeypress={(e) => {
						if (!(e instanceof KeyboardEvent)) return;
						switch (e.key) {
							case ' ':
							case 'SpaceBar':
							case 'Space':
							case 'Enter':
								e.preventDefault();
								goto(item.link);
								break;
						}
					}}
					class="group relative overflow-hidden md:aspect-square w-auto md:w-84 lg:w-auto lg:aspect-auto rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition-all duration-500 outline-none hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-600/30"
				>
					<!-- Hover Glow Effect -->
					<div
						class="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-orange-500/0 blur-2xl transition-all duration-500 group-hover:bg-orange-500/20 group-focus:bg-orange-500/20"
					></div>

					<!-- Icon -->
					<div
						class="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-orange-600/80 group-focus:scale-110 group-focus:rotate-3 group-focus:shadow-orange-600/80"
					>
						<svelte:component this={item.icon} size={32} strokeWidth={2.5} />
					</div>

					<!-- Content -->
					<div class="relative space-y-4 text-left">
						<h3
							class="text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-400 group-focus:text-orange-400"
						>
							{item.title}
						</h3>

						<p class="text-sm leading-relaxed text-gray-300 md:text-base">
							{item.description}
						</p>

						<a
							href={item.link}
							class="inline-flex items-center gap-2 font-semibold text-orange-400 transition-all duration-300 hover:gap-3 hover:text-amber-500"
						>
							{item.linkText}
						</a>
					</div>

					<!-- Bottom Accent Line -->
					<div
						class="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-orange-600 to-amber-500 transition-all duration-500 group-hover:w-full group-focus:w-full"
					></div>
				</button>
			{/each}
		</div>
	</div>
</section>
