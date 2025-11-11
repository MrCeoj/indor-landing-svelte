<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import IndorLogoText from '$lib/components/IndorLogoText.svelte';
	import { fade, scale } from 'svelte/transition';
	import { Users, Heart, Trophy, Star, Target, Handshake } from 'lucide-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-indor-black text-white">
	<Navbar />

	<!-- Hero -->
	<section class="relative overflow-hidden px-4 pt-32 pb-20 border-y border-y-amber-500/10">
		<div class="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"></div>
		<div class="absolute right-1/3 bottom-0 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>

		<div class="relative z-10 mx-auto max-w-5xl text-center" in:fade={{ duration: 600 }}>
			<h1
				class="mb-4 bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-5xl font-extrabold text-transparent"
			>
				Sobre Nosotros
			</h1>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
				En <span class="font-semibold text-orange-400">Indor Club</span> creemos que el deporte, la comunidad
				y la buena energía transforman vidas. Somos más que un club: somos un espacio para conectar,
				crecer y disfrutar cada momento.
			</p>
		</div>
	</section>

	<!-- History / Mission -->
	<section class="relative px-4 py-20">
		<div class="absolute top-20 left-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"></div>
		<div class="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"></div>

		<div class="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
			<!-- Text -->
			<div in:fade={{ delay: 100 }}>
				<h2 class="mb-6 text-3xl font-bold">Nuestra Historia</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					Indor Club nació con la visión de crear un espacio integral donde el deporte, la
					gastronomía y el entretenimiento convivan en perfecta armonía. Desde nuestros inicios,
					hemos buscado elevar la experiencia de nuestros visitantes a través de calidad, innovación
					y un ambiente acogedor.
				</p>
				<p class="leading-relaxed text-gray-300">
					Creemos en el poder de la comunidad: cada partido, cada café compartido y cada evento
					forman parte de nuestra identidad.
				</p>
			</div>

			<!-- Image -->
			<div
				class="relative overflow-hidden rounded-3xl border border-orange-500/20 shadow-2xl shadow-orange-600/30"
				in:scale={{ delay: 200 }}
			>
				<img
					src="/image/Indor1.jpeg"
					alt="Indor Club historia"
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
	</section>

	<!-- Mission & Vision -->
	<section class="relative bg-linear-to-b from-black/40 to-black/20 px-4 py-20">
		<div class="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
			<div in:fade={{ delay: 200 }}>
				<img
					src="/image/Indor2.jpeg"
					alt="Nuestra misión"
					class="rounded-3xl border border-orange-500/20 shadow-2xl shadow-amber-600/30"
				/>
			</div>
			<div class="space-y-6">
				<h2 class="text-3xl font-bold">Misión & Visión</h2>
				<p class="leading-relaxed text-gray-300">
					Nuestra <span class="font-semibold text-orange-400">misión</span> es ofrecer un espacio moderno
					y dinámico donde las personas disfruten del deporte, la buena comida y la convivencia en un
					ambiente único.
				</p>
				<p class="leading-relaxed text-gray-300">
					Nuestra <span class="font-semibold text-amber-400">visión</span> es consolidarnos como el club
					social y deportivo líder en la región, reconocido por su calidad, innovación y compromiso con
					la comunidad. No sólo por el deporte, sino como un espacio donde socializar y disfrutar de las
					amenidades de la comida y el café.
				</p>
			</div>
		</div>
	</section>

	<!-- Values Grid -->
	<section class="relative px-4 py-20 text-center">
		<h2 class="mb-10 text-3xl font-bold">Nuestros Valores</h2>

		<div class="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<div
				class="group rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition hover:scale-105 hover:shadow-orange-600/30"
			>
				<Users size={40} class="mx-auto mb-4 text-orange-400" />
				<h3 class="mb-2 text-xl font-semibold">Comunidad</h3>
				<p class="text-gray-400">
					Fomentamos la conexión, el respeto y la colaboración entre todos los miembros.
				</p>
			</div>

			<div
				class="group rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition hover:scale-105 hover:shadow-orange-600/30"
			>
				<Trophy size={40} class="mx-auto mb-4 text-orange-400" />
				<h3 class="mb-2 text-xl font-semibold">Excelencia</h3>
				<p class="text-gray-400">
					Buscamos la perfección en cada detalle, desde nuestras canchas hasta nuestro servicio.
				</p>
			</div>

			<div
				class="group rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition hover:scale-105 hover:shadow-orange-600/30"
			>
				<Heart size={40} class="mx-auto mb-4 text-orange-400" />
				<h3 class="mb-2 text-xl font-semibold">Pasión</h3>
				<p class="text-gray-400">
					Nos mueve el amor por el deporte, la gastronomía y las experiencias que inspiran.
				</p>
			</div>

			<div
				class="group rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition hover:scale-105 hover:shadow-orange-600/30"
			>
				<Star size={40} class="mx-auto mb-4 text-orange-400" />
				<h3 class="mb-2 text-xl font-semibold">Innovación</h3>
				<p class="text-gray-400">
					Adoptamos nuevas ideas y tecnologías para brindar experiencias únicas.
				</p>
			</div>

			<div
				class="group rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition hover:scale-105 hover:shadow-orange-600/30"
			>
				<Target size={40} class="mx-auto mb-4 text-orange-400" />
				<h3 class="mb-2 text-xl font-semibold">Compromiso</h3>
				<p class="text-gray-400">
					Trabajamos día a día para ofrecer la mejor experiencia a nuestros socios y visitantes.
				</p>
			</div>

			<div
				class="group rounded-2xl border border-orange-500/20 bg-linear-to-br from-orange-900/20 to-black p-8 shadow-xl transition hover:scale-105 hover:shadow-orange-600/30"
			>
				<Handshake size={40} class="mx-auto mb-4 text-orange-400" />
				<h3 class="mb-2 text-xl font-semibold">Hospitalidad</h3>
				<p class="text-gray-400">
					Hacemos que todos se sientan bienvenidos, valorados y parte de la familia Indor.
				</p>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="relative overflow-hidden px-4 py-32 text-center border-t border-t-amber-500/10">
		<div
			class="absolute inset-0 bg-linear-to-b from-transparent via-orange-600/20 to-transparent"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/20 blur-3xl"
		></div>

		<div class="relative z-10 mx-auto max-w-4xl">
			<h2 class="mb-6 text-4xl font-bold inline-flex flex-wrap text-center justify-center gap-4">
				¿Listo para unirte a la experiencia
				<span class="text-orange-400 inline-flex gap-2">
					<IndorLogoText size="large" />?
				</span>
			</h2>
			<p class="mb-8 text-gray-300">
				Vive el deporte, la convivencia y el estilo en un mismo lugar.
			</p>
			<button
				onclick={() => goto('/reservaciones#book')}
				class="rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-orange-600/50 transition-transform duration-300 hover:scale-105 hover:shadow-orange-600/80"
			>
				Reserva ahora
			</button>
		</div>
	</section>

	<Footer />
</div>

<svelte:head>
	<title>Sobre Nosotros | Indor Club</title>
	<meta
		name="description"
		content="Descubre la historia, misión, visión y valores de Indor Club — un espacio donde el deporte, la comunidad y la buena energía se unen para transformar vidas."
	/>
	<meta
		name="keywords"
		content="Indor Club, club deportivo, comunidad, deporte, gastronomía, entretenimiento, historia, misión, visión, valores, Ecuador, canchas, café, restaurante"
	/>
	<meta name="author" content="Indor Club" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://indorclub.com/sobre-nosotros" />
	<meta property="og:title" content="Sobre Nosotros | Indor Club" />
	<meta
		property="og:description"
		content="Conoce más sobre Indor Club: nuestra historia, misión, visión y valores. Más que un club, somos una comunidad que vive el deporte, la amistad y la buena energía."
	/>
	<meta property="og:image" content="https://indorclub.com/image/Indor1.jpeg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://indorclub.com/sobre-nosotros" />
	<meta name="twitter:title" content="Sobre Nosotros | Indor Club" />
	<meta
		name="twitter:description"
		content="En Indor Club celebramos el deporte, la comunidad y el estilo de vida saludable. Conoce nuestra historia, misión, visión y valores."
	/>
	<meta name="twitter:image" content="https://indorclub.com/image/Indor1.jpeg" />

	<!-- Favicon -->
	<link rel="icon" href="/favicon.ico" />
</svelte:head>
