<script lang="ts">
	import { UtensilsCrossed, Clock, Users, Trophy, ChevronRight, Check } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import IndorLogoText from '$lib/components/IndorLogoText.svelte';
	import TakeABreakLogo from '$lib/components/TakeABreakLogo.svelte';
	import BuenVicioLogo from '$lib/components/BuenVicioLogo.svelte';
	import { goto } from '$app/navigation';
	import Carousel from '$lib/components/Carousel.svelte';
	import type { PageData } from '../$types';

	let { data } = $props<{data: PageData}>();

	let services = $derived(data.services);

	let stats = [
		{ icon: Users, number: '500+', label: 'Jugadores activos' },
		{ icon: Trophy, number: '8', label: 'Canchas premium' },
		{ icon: UtensilsCrossed, number: 'Bebidas', label: 'Y alimentos' },
		{ icon: Clock, number: '18hrs', label: 'Servicio diario' }
	];
</script>

<div class="min-h-screen bg-indor-black text-white">
	<Navbar />
	<!-- Hero Section -->
	<section class="relative overflow-hidden px-4 pt-32 pb-12">
		<!-- Background Effects -->
		<div class="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>
		<div class="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>

		<div class="relative z-10 mx-auto max-w-7xl text-center">
			<div
				in:fade={{ duration: 600 }}
				class="mb-8 inline-block rounded-full border border-orange-500/30 bg-orange-600/20 px-6 py-3 text-sm font-bold tracking-wide text-orange-400 uppercase"
			>
				🏆 Servicios Premium
			</div>

			<h1
				in:fade={{ delay: 200, duration: 600 }}
				class="mb-6 font-Nord text-4xl leading-tight font-extrabold text-white sm:text-5xl lg:text-7xl"
			>
				Todo lo que necesitas
				<span
					class="mt-2 block bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
				>
					en un solo lugar
				</span>
			</h1>

			<p
				in:fade={{ delay: 400, duration: 600 }}
				class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl"
			>
				Descubre una experiencia completa que combina deporte, gastronomía y entretenimiento. En
				Indor Club, cada detalle está diseñado para superar tus expectativas.
			</p>

			<!-- Stats Grid -->
			<div
				in:fade={{ delay: 600, duration: 600 }}
				class="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
			>
				{#each stats as stat}
					<div
						class="rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-6 shadow-xl"
					>
						<div class="mb-3 flex justify-center">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-600 to-amber-500"
							>
								<stat.icon size={24} strokeWidth={2.5} />
							</div>
						</div>
						<div class="text-3xl font-bold text-orange-400">{stat.number}</div>
						<div class="mt-1 text-sm text-gray-400">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Services Sections -->
	{#each services as service, index}
		<section
			id={service.id}
			class="relative px-4 pt-4 md:py-10"
			in:fade={{ delay: 200, duration: 600 }}
		>
			<!-- Floating Glow Orbs -->
			{#if index % 2 === 0}
				<div
					class="absolute top-1/2 left-10 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl"
				></div>
			{:else}
				<div
					class="absolute top-1/2 right-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"
				></div>
			{/if}

			<div class="relative z-10 mx-auto max-w-7xl">
				<div
					class="grid items-center gap-12 md:grid-cols-2"
					class:lg:flex-row-reverse={index % 2 === 1}
				>
					<!-- Image Side -->
					<div
						class="order-2"
						class:md:order-1={index % 2 === 1}
						class:md:order-2={index % 2 === 0}
					>
						<div class="hidden md:block">
							<Carousel carouselImages={service.image} />
						</div>
					</div>

					<!-- Content Side -->
					<div
						class="order-1 space-y-6"
						class:md:order-2={index % 2 === 1}
						class:md:order-1={index % 2 === 0}
					>
						<div
							class="inline-block rounded-full border border-orange-500/30 bg-orange-600/20 px-4 py-2 text-xs font-bold tracking-wide text-orange-400 uppercase"
						>
							{service.tagline}
						</div>
						{#if service.id == 'takeabreak'}
							<br />
							<span class="text-3xl font-bold text-white">
								<TakeABreakLogo />
							</span>
						{:else if service.id == 'buenvicio'}
							<br />
							<span class="text-3xl font-bold text-white">
								<BuenVicioLogo />
							</span>
						{/if}
						<h2 class="text-3xl font-bold text-white lg:text-4xl">
							{service.title}
						</h2>

						<div
							class="order-2"
							class:md:order-2={index % 2 === 1}
							class:md:order-1={index % 2 === 0}
						>
							<div
								class="group relative block aspect-video overflow-hidden rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black shadow-2xl shadow-orange-600/20 md:hidden"
							>
								<div class="block md:hidden">
									<Carousel carouselImages={service.image} />
								</div>
							</div>
						</div>

						<!-- First paragraph -->
						<p class="text-base leading-relaxed text-gray-300 lg:text-lg">
							{service.description[0]}
						</p>

						<!-- Rest as feature list -->
						<ul class="space-y-3">
							{#each service.description.slice(1) as feature}
								<li class="flex items-start gap-3">
									<div
										class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-600/20"
									>
										<Check size={14} class="text-orange-400" strokeWidth={3} />
									</div>
									<span class="text-gray-300">{feature}</span>
								</li>
							{/each}
						</ul>

						<!-- Features List -->
						<ul class="space-y-3">
							{#each service.features as feature}
								<li class="flex items-start gap-3">
									<div
										class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-600/20"
									>
										<Check size={14} class="text-orange-400" strokeWidth={3} />
									</div>
									<span class="text-gray-300">{feature}</span>
								</li>
							{/each}
						</ul>

						<!-- CTA Button -->
						{#if service.hasbutton}
							<div class="pt-4">
								<a
									tabindex={0}
									href={service.ctaLink}
									class="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-600/50 transition-all duration-300 hover:scale-105 hover:shadow-orange-600/80"
								>
									{service.cta}
									<ChevronRight
										size={20}
										class="transition-transform duration-300 group-hover:translate-x-1"
									/>
								</a>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>
	{/each}

	<!-- Final CTA Section -->
	<section class="relative overflow-x-hidden px-4 py-32">
		<div
			class="absolute inset-0 bg-linear-to-b from-transparent via-orange-600/20 to-transparent"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/20 blur-3xl"
		></div>

		<div class="relative z-10 mx-auto max-w-4xl text-center">
			<h2
				class="mb-6 flex flex-col items-center gap-2 text-center text-4xl font-bold text-white lg:text-5xl"
			>
				¿Listo para vivir la
				<span
					class="flex gap-5 bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
				>
					experiencia <span class="flex gap-2 text-white"><IndorLogoText />?</span>
				</span>
			</h2>

			<p class="mb-10 text-lg text-gray-300">
				Únete a nuestra comunidad y descubre por qué somos el club favorito de la ciudad.
			</p>

			<div class="flex flex-wrap justify-center gap-4">
				<button
					onclick={() => goto('/reservaciones#book')}
					class="relative overflow-hidden rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-orange-600/50 transition-transform duration-300 before:absolute before:inset-0 before:-left-full before:bg-linear-to-r before:from-transparent before:via-amber-500/30 before:to-transparent before:transition-all before:duration-500 hover:scale-105 hover:shadow-orange-600/80 hover:before:left-full"
				>
					<span class="relative z-10">Reserva tu cancha</span>
				</button>

				<a
					tabindex={0}
					href="/reservaciones#contacto"
					class="rounded-xl border-2 border-orange-500/50 px-8 py-4 text-base font-semibold text-orange-400 backdrop-blur-sm transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
				>
					Contáctanos
				</a>
			</div>
		</div>
	</section>
</div>

<Footer />

<svelte:head>
	<title>Servicios | Indor Club</title>
	<meta
		name="description"
		content="Descubre los servicios premium de Indor Club: canchas de pádel, gastronomía con Take a Break Café, coctelería con Buen Vicio y experiencias únicas para toda la comunidad deportiva."
	/>
	<meta
		name="keywords"
		content="Indor Club, servicios, pádel, club deportivo, restaurante, café, coctelería, Take a Break, Buen Vicio, canchas, gastronomía, entretenimiento, Mexicali"
	/>
	<meta name="author" content="Indor Club" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://indorclub.com/servicios" />
	<meta property="og:title" content="Servicios | Indor Club" />
	<meta
		property="og:description"
		content="En Indor Club, disfruta de canchas premium, gastronomía exclusiva, café artesanal y coctelería de autor. Todo lo que necesitas, en un solo lugar."
	/>
	<meta property="og:image" content="https://indorclub.com/image/Banner2.jpeg" />
	<meta property="og:locale" content="es_MX" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://indorclub.com/servicios" />
	<meta name="twitter:title" content="Servicios | Indor Club" />
	<meta
		name="twitter:description"
		content="Descubre los servicios de Indor Club: pádel, gastronomía, café y coctelería en un ambiente único."
	/>
	<meta name="twitter:image" content="https://indorclub.com/image/Banner2.jpeg" />

</svelte:head>
