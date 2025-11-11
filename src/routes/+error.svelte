<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { scale, fade } from 'svelte/transition';
	export let error;
	export let status;
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-indor-black text-white text-center px-4">
     <Navbar />
	<a in:scale={{ duration: 400 }} href="/" class="flex flex-col items-center space-y-1 mb-6">
		<span class="flex flex-col items-end">
			<span class="font-kholic text-8xl text-indor-orange leading-none">
				Ind
				<span class="-mx-6.5 inline-block origin-center rotate-75">o</span>
				r
			</span>
			<span class="font-Nord text-2xl font-bold tracking-wide -mt-5">CLUB</span>
		</span>
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
