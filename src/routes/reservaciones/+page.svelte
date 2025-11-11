<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import PlaytomicLogo from '$lib/components/PlaytomicLogo.svelte';
	import WhatsappLogo from '$lib/components/WhatsappLogo.svelte';
	import { Clock, Trophy, GraduationCap, Phone, ExternalLink, InfoIcon } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import type { PageData } from '../$types.d.ts';

	let bookingType = $state('court');

	
	let contactMethods = [
		{
			icon: PlaytomicLogo,
			title: 'Playtomic',
			description: 'Reserva en línea de forma rápida y segura. Disponibilidad en tiempo real.',
			action: 'Reservar en Playtomic',
			link: 'https://playtomic.com/clubs/indor-club',
			color: 'from-blue-600 to-blue-400'
		},
		{
			icon: WhatsappLogo,
			title: 'WhatsApp',
			description: 'Envíanos un mensaje y te ayudaremos a encontrar el horario perfecto.',
			action: 'Abrir WhatsApp',
			link: 'https://wa.me/526964299031',
			color: 'from-green-600 to-green-400'
		},
		{
			icon: Phone,
			title: 'Teléfono',
			description: 'Llámanos directamente para reservar o resolver cualquier duda.',
			action: 'Llamar ahora',
			link: 'tel:+526861234567',
			phone: '+52 686 429 9031',
			color: 'from-orange-600 to-amber-500'
		}
	];

	let features = [
		'Confirmación inmediata',
		'Cancela hasta 24h antes',
		'Múltiples métodos de pago',
		'Horarios disponibles 6:00 - 24:00 hrs',
		'Reserva individual o en grupo',
		'Soporte en línea'
	];

	export function autoHeight(node: HTMLElement, duration = 400) {
		const height = new Tween(node.scrollHeight, { duration, easing: cubicOut });
		let currentHeight = node.scrollHeight;

		const update = () => {
			const newHeight = node.scrollHeight;
			if (newHeight !== currentHeight) {
				currentHeight = newHeight;
				height.set(newHeight);
			}
		};

		const observer = new ResizeObserver(update);
		observer.observe(node);

		let frame: number;
		let running = true;

		const loop = () => {
			if (!running) return;
			node.parentElement!.style.height = height.current + 'px';
			frame = requestAnimationFrame(loop);
		};

		loop();

		return {
			destroy() {
				running = false;
				cancelAnimationFrame(frame);
				observer.disconnect();
			}
		};
	}

	let { data } = $props<{data: PageData}>()

	let { preciosCanchas, preciosClases } = $derived(data)
</script>

<div class="min-h-screen bg-indor-black text-white">
	<Navbar />
	<!-- Hero Section -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>
		<div class="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>
	</div>
	<section class="relative z-10 px-4 pt-32 pb-16">
		<div class="relative z-10 mx-auto max-w-7xl text-center">
			<h1
				in:fade={{ delay: 200, duration: 600 }}
				class="mb-6 font-Nord text-4xl leading-tight font-extrabold text-white sm:text-5xl lg:text-6xl"
			>
				Reserva tu
				<span
					class="block bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
				>
					experiencia perfecta
				</span>
			</h1>

			<p
				in:fade={{ delay: 400, duration: 600 }}
				class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300"
			>
				Elige tu método preferido para reservar. Rápido, fácil y seguro.
			</p>
		</div>
	</section>

	<!-- Booking Type Selector -->
	<section class="relative px-4 pb-12">
		<div class="relative z-10 mx-auto max-w-4xl">
			<div class="grid gap-4 md:grid-cols-2">
				<button
					onclick={() => (bookingType = 'court')}
					class={`group relative overflow-hidden rounded-2xl border-2 p-8 transition-all duration-300
					${
						bookingType === 'court'
							? 'border-orange-500 bg-linear-to-br from-orange-900/40 to-indor-black'
							: 'border-orange-500/20 bg-orange-900/10'
					}`}
				>
					<div class="flex items-center gap-4">
						<div
							class={`duration-300" flex h-16 w-16 items-center justify-center rounded-xl transition-all
							${bookingType === 'court' ? 'bg-linear-to-br from-orange-600 to-amber-500' : 'bg-orange-900/20'}
							`}
						>
							<Trophy
								size={32}
								strokeWidth={2.5}
								class={bookingType === 'court' ? 'text-white' : 'text-orange-400'}
							/>
						</div>
						<div class="text-left">
							<h3 class="text-xl font-bold">Canchas de Pádel</h3>
							<p class="text-sm text-gray-400">90 o 120 minutos</p>
						</div>
					</div>
				</button>

				<button
					onclick={() => (bookingType = 'class')}
					class={`group duration-300" relative overflow-hidden rounded-2xl border-2 p-8 transition-all
					class:=${bookingType === 'class' ? 'border-orange-500 bg-linear-to-br from-orange-900/40 to-black' : '					border-orange-500/20 bg-orange-900/10'}`}
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300"
							class:bg-linear-to-br={bookingType === 'class'}
							class:from-orange-600={bookingType === 'class'}
							class:to-amber-500={bookingType === 'class'}
							class:bg-orange-900={bookingType !== 'class'}
						>
							<!--orange-900/20-->
							<GraduationCap
								size={32}
								strokeWidth={2.5}
								class={bookingType === 'class' ? 'text-white' : 'text-orange-400'}
							/>
						</div>
						<div class="text-left">
							<h3 class="text-xl font-bold">Clases Privadas</h3>
							<p class="text-sm text-gray-400">60 minutos</p>
						</div>
					</div>
				</button>
			</div>
		</div>
	</section>

	<!-- Price Table -->
	<section class="relative px-4 pb-16">
		<div class="absolute top-0 right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"></div>

		<div class="relative z-10 mx-auto max-w-5xl">
			<div class="mb-8 text-center font-Nord">
				<h2 class="mb-3 text-2xl font-bold text-white lg:text-3xl">Tarifas por Horario</h2>
			</div>

			<div
				class="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black shadow-2xl"
			>
				<div use:autoHeight class="overflow-x-auto p-2">
					{#key bookingType}
						<div>
							{#if bookingType === 'court'}
									<table class="w-[600px] sm:w-full">
										<thead>
											<tr class="border-b border-orange-500/20">
												<th
													class="w-1/3 px-6 py-4 text-left text-sm font-bold text-orange-400 uppercase"
													>Días</th
												>
												<th
													class="w-1/3 px-6 py-4 text-center text-sm font-bold text-orange-400 uppercase"
													>Horario</th
												>
												<th
													class="w-1/3 px-6 py-4 text-center text-sm font-bold text-orange-400 uppercase"
													>Precio (60 min)</th
												>
											</tr>
										</thead>
										<tbody>
											{#each preciosCanchas as dayGroup}
												<tr
													class="border-b border-orange-500/10 transition-colors hover:bg-orange-900/10"
												>
													<td class="px-6 py-4 align-middle font-Nord text-2xl">{dayGroup.dias}</td>
													<td colspan="2">
														{#each dayGroup.periodos_precios as item}
															<table class="w-full">
																<tbody>
																	<tr>
																		<td class="w-1/2 px-6 py-3 text-center text-gray-400"
																			>{item.horario}</td
																		>
																		<td
																			class="w-1/2 px-6 py-3 text-center text-xl font-bold text-orange-400"
																		>
																			${item.precio}
																		</td>
																	</tr>
																</tbody>
															</table>
														{/each}
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
							{:else}
								<table class="h-full w-[600px] sm:w-full">
									<thead>
										<tr class="border-b border-orange-500/20">
											<th class="px-6 py-4 text-left text-sm font-bold text-orange-400 uppercase"
												>Periodo</th
											>
											<th class="px-6 py-4 text-center text-sm font-bold text-orange-400 uppercase"
												>Horario</th
											>
											<th class="px-6 py-4 text-center text-sm font-bold text-orange-400 uppercase"
												>Precio (60 min)</th
											>
										</tr>
									</thead>
									<tbody>
										{#each preciosClases as c}
											<tr
												class="border-b border-orange-500/10 transition-colors hover:bg-orange-900/10"
											>
												<td class="px-6 py-4 font-Nord font-semibold">{c.periodo}</td>
												<td class="px-6 py-4 text-center text-gray-400">{c.horas}</td>
												<td class="px-6 py-4 text-center text-xl font-bold text-orange-400"
													>${c.precio}</td
												>
											</tr>
										{/each}
									</tbody>
								</table>
							{/if}
						</div>
					{/key}
				</div>
			</div>
		</div>

		<!--Price Disclaimer-->
		{#if bookingType === 'court'}
			<div
				class="relative mx-auto my-8 flex max-w-4xl items-center gap-3 rounded-2xl border border-orange-500/30 bg-linear-to-r from-orange-900/30 to-amber-900/10 p-4 text-sm text-orange-400 shadow-lg shadow-orange-900/20 backdrop-blur-md transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-600/30"
				in:fade={{ duration: 500 }}
				out:slide={{ duration: 500 }}
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/40"
				>
					<InfoIcon size={20} strokeWidth={2.5} />
				</div>

				<p class="leading-relaxed">
					<span class="font-semibold text-orange-300">Nota:</span>
					Los precios mostrados son por la renta de
					<span class="font-medium">60 minutos</span> en el horario estipulado, pero la
					<span class="font-medium">renta mínima es de 90 minutos por cancha</span>. El costo de
					renta variará dependiendo de la duración de la reservación y si el horario
					<span class="italic">traslapa con otro periodo con precio distinto</span>.
				</p>
			</div>
		{/if}
	</section>
	<!-- Contact Methods -->
	<section id="book" class="relative px-4 pb-16">
		<div class="absolute top-1/2 left-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"></div>

		<div class="relative z-10 mx-auto max-w-6xl">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-white lg:text-4xl">
					Elige tu forma de
					<span class="bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
						reservar
					</span>
				</h2>
				<p class="text-lg text-gray-400">Tres maneras fáciles de asegurar tu cancha o clase</p>
			</div>

			<div class="flex flex-wrap justify-center gap-6">
				{#each contactMethods as method, index}
					<button
						onkeypress={(e) => {
							if (!(e instanceof KeyboardEvent)) return;
							switch (e.key) {
								case ' ':
								case 'SpaceBar':
								case 'Space':
								case 'Enter':
									e.preventDefault();
									window.open(method.link, '_blank');
									break;
							}
						}}
						in:fade={{ delay: 200 + index * 100, duration: 600 }}
						class={`group relative flex max-w-80 min-w-80 flex-col justify-between gap-8 overflow-hidden rounded-3xl border bg-linear-to-br to-black/80 p-8 shadow-xl transition-all duration-500  hover:shadow-2xl focus:shadow-2xl focus:outline-none
						${
							method.title === 'Playtomic'
								? 'border-blue-500/20 from-blue-900/20 hover:border-blue-500/60 hover:shadow-blue-600/30 focus:border-blue-500/60 focus:shadow-blue-600/30'
								: method.title === 'WhatsApp'
									? 'border-emerald-500/20 from-emerald-900/20 hover:border-emerald-500/60 hover:shadow-emerald-600/30 focus:border-emerald-500/60 focus:shadow-emerald-600/30'
									: 'border-orange-500/20 from-orange-900/20 hover:border-orange-500/60 hover:shadow-orange-600/30 focus:border-orange-500/60 focus:shadow-orange-600/30'
						}`}
					>
						<!-- Hover Glow Effect -->
						<div
							class={`absolute -top-24 -right-24 h-48 w-48 rounded-full blur-2xl transition-all duration-500 
							${
								method.title === 'Playtomic'
									? 'bg-blue-500/0 group-hover:bg-blue-500/20 group-focus:bg-blue-500/20'
									: method.title === 'WhatsApp'
										? 'bg-emerald-500/0 group-hover:bg-emerald-500/20 group-focus:bg-emerald-500/20'
										: 'bg-orange-500/0 group-hover:bg-orange-500/20 group-focus:bg-orange-500/20'
							}`}
						></div>

						<!-- Content -->
						<div class="relative space-y-4 text-left">
							<!-- Icon -->
							<div
								class={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-focus:scale-110 group-focus:rotate-3
									${
										method.title === 'Playtomic'
											? 'shadow-blue-600/50'
											: method.title === 'WhatsApp'
												? 'shadow-green-600/50'
												: 'shadow-orange-600/50'
									}
								`}
								class:from-blue-600={method.title === 'Playtomic'}
								class:to-blue-400={method.title === 'Playtomic'}
								class:from-green-600={method.title === 'WhatsApp'}
								class:to-green-400={method.title === 'WhatsApp'}
								class:from-orange-600={method.title === 'Teléfono'}
								class:to-amber-500={method.title === 'Teléfono'}
							>
								{#if method.icon === PlaytomicLogo}
									<method.icon
										size={40}
										fillColor={'white'}
										strokeColor={'white'}
										clas="top-6 left-7 absolute"
									/>
								{:else if method.icon === WhatsappLogo}
									<method.icon size={40} fillColor="white" strokeColor="transparent" />
								{:else}
									<method.icon size={32} strokeWidth={2.5} />
								{/if}
							</div>
							<h3 class="flex flex-wrap items-center justify-between text-2xl font-bold text-white">
								{method.title}
								{#if method.phone}
									<p class="text-base font-semibold text-orange-400">{method.phone}</p>
								{/if}
							</h3>

							<p class="text-sm leading-relaxed text-gray-300">
								{method.description}
							</p>
						</div>
						<a
							href={method.link}
							target="_blank"
							rel="noopener noreferrer"
							class={`inline-flex w-fit items-center gap-2 rounded-xl border-2 px-6 py-3 font-semibold transition-all duration-300
							${
								method.title === 'Playtomic'
									? 'border-blue-500/50 text-blue-400 hover:border-blue-500 hover:bg-blue-500/10'
									: method.title === 'WhatsApp'
										? 'border-green-500/50 text-green-400 hover:border-green-500 hover:bg-green-500/10'
										: method.title === 'Teléfono'
											? ' border-orange-500/50 text-orange-400 hover:border-orange-500 hover:bg-orange-500/10'
											: ''
							}`}
						>
							{method.action}
							<ExternalLink size={16} />
						</a>

						<!-- Bottom Accent Line -->
						<div
							class="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r transition-all duration-500 group-hover:w-full group-focus:w-full"
							class:from-blue-600={method.title === 'Playtomic'}
							class:to-blue-400={method.title === 'Playtomic'}
							class:from-green-600={method.title === 'WhatsApp'}
							class:to-green-400={method.title === 'WhatsApp'}
							class:from-orange-600={method.title === 'Teléfono'}
							class:to-amber-500={method.title === 'Teléfono'}
						></div>
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="relative px-4">
		<div class="relative z-10 mx-auto max-w-5xl">
			<div
				class="rounded-3xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 md:p-12"
			>
				<div class="mb-8 text-center">
					<h3 class="mb-3 text-2xl font-bold text-white">Beneficios de reservar con nosotros</h3>
					<p class="text-gray-400">Todo lo que necesitas para una experiencia perfecta</p>
				</div>

				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each features as feature, index}
						<div
							in:slide={{ delay: 100 + index * 50, duration: 400 }}
							class="flex items-center gap-3 rounded-xl border border-orange-500/10 bg-orange-900/10 p-4 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-900/20"
						>
							<div
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-orange-600 to-amber-500"
							>
								<Clock size={16} class="text-white" strokeWidth={3} />
							</div>
							<span class="text-sm font-medium text-gray-300">{feature}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section id="contacto" class="relative overflow-hidden px-4 py-20">
		<div
			class="absolute inset-0 bg-linear-to-b from-transparent via-orange-900/20 to-transparent"
		></div>
		<div
			class="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl"
		></div>

		<div class="relative z-10 mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-white lg:text-4xl">¿Tienes alguna duda?</h2>

			<p class="mb-8 text-lg text-gray-300">
				Nuestro equipo está listo para ayudarte a encontrar el horario perfecto
			</p>

			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="https://wa.me/526864299031"
					tabindex={0}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-400 px-8 py-4 text-base font-bold text-white shadow-xl shadow-green-600/50 outline outline-transparent transition-all duration-300 hover:scale-105 hover:shadow-green-600/80 focus:scale-105 focus:shadow-green-600/80"
				>
					<WhatsappLogo fillColor="white" strokeColor="none" size={20} />
					Chatear en WhatsApp
				</a>

				<a
					tabindex={0}
					href="tel:+526861234567"
					class="inline-flex items-center gap-2 rounded-xl border-2 border-orange-500/50 px-8 py-4 text-base font-semibold text-orange-400 outline outline-transparent backdrop-blur-sm transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10 focus:border-orange-500 focus:bg-orange-500/10"
				>
					<Phone size={20} />
					Llamar ahora
				</a>
			</div>
		</div>
	</section>
</div>

<Footer />

<svelte:head>
	<title>Reservaciones | Indor Club</title>
	<meta
		name="description"
		content="Reserva tu cancha o clase en Indor Club. Elige entre Playtomic, WhatsApp o teléfono y asegura tu experiencia deportiva con facilidad, rapidez y seguridad."
	/>
	<meta
		name="keywords"
		content="Indor Club, reservaciones, canchas de pádel, clases de pádel, Playtomic, WhatsApp, reservas deportivas, precios, horarios, Mexicali, club deportivo, padel, Indor Club reservas"
	/>
	<meta name="author" content="Indor Club" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://indorclub.com/reservaciones" />
	<meta property="og:title" content="Reservaciones | Indor Club" />
	<meta
		property="og:description"
		content="Reserva tu cancha o clase en Indor Club. Disfruta de la mejor experiencia deportiva, con confirmación inmediata y soporte en línea."
	/>
	<meta property="og:image" content="https://indorclub.com/image/Indor2.jpeg" />
	<meta property="og:locale" content="es_MX" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://indorclub.com/reservaciones" />
	<meta name="twitter:title" content="Reservaciones | Indor Club" />
	<meta
		name="twitter:description"
		content="Reserva fácilmente tu cancha o clase de pádel en Indor Club. Tres métodos disponibles: Playtomic, WhatsApp o teléfono."
	/>
	<meta name="twitter:image" content="https://indorclub.com/image/Indor2.jpeg" />

	<!-- Favicon -->
	<link rel="icon" href="/icon.jpg" />
</svelte:head>
