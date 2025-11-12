<script lang="ts">
	import { Client, setContextClient, cacheExchange, fetchExchange } from '@urql/svelte';
	import favicon_dark from '$lib/assets/logo_orange.svg';
	import favicon_light from '$lib/assets/logo_black.svg';
	import '../app.css';

	let { children } = $props();

	const client = new Client({
		url: 'https://admin.indorclub.com/graphql',
		exchanges: [cacheExchange, fetchExchange],
		fetchOptions: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	});

	setContextClient(client);
</script>

<svelte:head>
	<link rel="icon" href={favicon_dark} media="(prefers-color-scheme: dark)"/>
	<link rel="icon" href={favicon_light} media="(prefers-color-scheme: light)"/>
</svelte:head>

<div
	class="fixed inset-0 bg-[radial-gradient(circle,#f59e0b_1px,transparent_1px)] bg-size-[40px_40px] opacity-15"
></div>
{@render children?.()}
