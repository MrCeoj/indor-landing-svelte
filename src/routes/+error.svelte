<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import IndorLogoText from '$lib/components/IndorLogoText.svelte';
	import { scale, fade } from 'svelte/transition';
	export let error;
	export let status;
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-indor-black text-white text-center px-4">
     <Navbar />
	<a in:scale={{ duration: 400 }} href="/" class="flex flex-col items-center space-y-1 mb-6">
		<IndorLogoText size="huge"/>
	</a>

	<h1 in:fade={{ delay: 200 }} class="text-5xl font-bold text-indor-orange mb-2">
		{status === 404 ? '404' : status}
	</h1>

	<p in:fade={{ delay: 300 }} class="text-lg mb-8 opacity-80">
		{status === 404
			? "Oops... no encontramos la página que buscas."
			: error?.message ?? 'Ha ocurrido un error inesperado.'}
	</p>

	<a
		href="/"
		in:scale={{ delay: 400 }}
		class="rounded-lg bg-linear-to-r from-indor-orange to-orange-dense px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indor-orange/50"
	>
		Volver al inicio
	</a>
</div>
