<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Services from '$lib/components/Services.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types.d.ts';

	let { data } = $props<{ data: PageData }>();
	let images = $derived(data.images)

</script>

<div class="min-h-screen bg-indor-black text-white">
	<Navbar />
	<Hero images={images} />
	<Services />
	<Footer />
</div>

<svelte:head>
	<title>Indor Club | Social Club & Sports Bar</title>
	<meta
		name="description"
		content="Combinamos lo mejor del pádel, la gastronomía y el entretenimiento en un solo lugar. Vive la experiencia Indor Club, el destino ideal para disfrutar, conectar y competir."
	/>
	<meta
		name="keywords"
		content="Indor Club, club deportivo, pádel, deportes, gastronomía, entretenimiento, Mexicali, bar, restaurante, club social, reservaciones"
	/>
	<meta name="author" content="Indor Club" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://indorclub.com/" />
	<meta property="og:title" content="Indor Club | Social Club & Sports Bar" />
	<meta
		property="og:description"
		content="Vive la experiencia Indor Club: pádel, buena comida y entretenimiento en un solo lugar."
	/>
	<meta property="og:image" content="https://indorclub.com/image/Indor1.jpeg" />
	<meta property="og:locale" content="es_MX" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://indorclub.com/" />
	<meta name="twitter:title" content="Indor Club | Social Club & Sports Bar" />
	<meta
		name="twitter:description"
		content="Descubre Indor Club — el mejor club deportivo y social de Mexicali. Pádel, gastronomía y estilo en un solo espacio."
	/>
	<meta name="twitter:image" content="https://indorclub.com/image/Indor1.jpeg" />

	<!-- Favicon -->
	<link rel="icon" href="/icon.jpg" />
</svelte:head>

