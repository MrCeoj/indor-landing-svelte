<script>
	import { scale } from 'svelte/transition';
	import { MapPin, Clock, Instagram, Phone, X, Play, Facebook } from 'lucide-svelte';
	import PlaytomicLogo from './PlaytomicLogo.svelte';
	import WhatsappLogo from './WhatsappLogo.svelte';
	import IndorLogoText from './IndorLogoText.svelte';
	const year = new Date().getFullYear();
	let showMap = $state(false);

	let strokeColor = '#99a1af';
	let fillColor = '#99a1af';
</script>

<footer class="relative border-t border-indor-orange/20 bg-black/50 px-4 py-4 md:py-6">
	<div class="absolute top-4 left-3 lg:top-5 lg:left-5">
		<IndorLogoText size="small" />
	</div>

	<div class="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
		<!-- Location -->
		<div class="mt-0 grid grid-cols-4 sm:mt-14 sm:grid-cols-2 md:px-6 lg:mt-0 lg:grid-cols-4">
			<div class="col-span-3 col-start-2 flex flex-col gap-2 sm:col-start-1 lg:col-start-2">
				<span class="block text-sm font-semibold text-indor-orange sm:hidden lg:block"
					>Ubicación</span
				>
				<span class="flex items-start text-sm text-gray-400">
					<MapPin size={16} class="mt-1 mr-2 shrink-0" />
					Av. Paraguay #58, Cuauhtémoc Sur, Mexicali, México
				</span>

				<!-- Clickable Map Preview -->
				<button
					onclick={() => {showMap = true}}
					class="aspect-video w-full max-w-xs overflow-hidden rounded-xl cursor-pointer duration-200 hover:scale-105 hover:shadow-2xl hover:opacity-80"
					aria-label="Ver mapa"
				>
					<img
						src="/image/mapa.png"
						alt="Ubicación Indor Club"
						class="h-full w-full object-fill"
						loading="lazy"
					/>
				</button>
			</div>
		</div>

		<!-- Contact & Links -->
		<div class="col-span-2 grid grid-cols-2 divide-indor-orange/10 pr-2 lg:justify-items-center">
			<div class="text-sm text-gray-400 md:px-6">
				<h4 class="mb-2 font-semibold text-indor-orange">Encuéntranos</h4>
				<ul class="space-y-2.5">
					<li class="flex items-center"><Clock size={16} class="mr-2" /> 6:00-24:00 hrs</li>
					<li class="flex items-center">
						<PlaytomicLogo {strokeColor} {fillColor} size={20} clas="ml-0.5 mr-0.5" />
						<a
							tabindex="0"
							href="https://playtomic.com/clubs/indor-club"
							class="text-indor-orange hover:opacity-70">Playtomic</a
						>
					</li>
					<li class="flex items-center">
						<WhatsappLogo size={16} clas="mr-2" {strokeColor} {fillColor} strokeWidth={0.5} />
						<a
							tabindex="0"
							class="text-indor-orange hover:opacity-70"
							href="https://wa.me/526864299031">686 429 9031</a
						>
					</li>
					<li class="flex items-center">
						<Facebook
							size={16}
							fill={'2c2c2c'}
							strokeWidth={2}
							color={'2c2c2c'}
							class="mr-2 rounded-sm bg-gray-400"
						/><a
							tabindex="0"
							href="https://www.facebook.com/61573198137016/"
							class="text-indor-orange hover:opacity-70">Facebook</a
						>
					</li>
					<li class="flex items-center">
						<Instagram size={16} class="mr-2" />
						<a
							tabindex="0"
							href="https://www.instagram.com/indorclub"
							class="text-indor-orange hover:opacity-70">Instagram</a
						>
					</li>
				</ul>
			</div>

			<div class="text-sm text-gray-400 md:px-6">
				<h4 class="mb-2 font-semibold text-indor-orange">Enlaces rápidos</h4>
				<ul class="space-y-2.5">
					<li>
						<a tabindex="0" href="/reservaciones" class="hover:text-indor-orange"
							>Reservas & Clases</a
						>
					</li>
					<li><a tabindex="0" href="/servicios" class="hover:text-indor-orange">Servicios</a></li>
					<li><a tabindex="0" href="/merch" class="hover:text-indor-orange">Nuestra Merch</a></li>
					<li>
						<a tabindex="0" href="/nosotros" class="hover:text-indor-orange">Sobre Nosotros</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="mt-6 border-t border-indor-orange/20 pt-6 text-center text-xs text-gray-500">
		© {year} INDOR CLUB. Todos los derechos reservados.
	</div>
</footer>

<!-- Modal -->
{#if showMap}
	<div
		role="button"
		tabindex="0"
		aria-label="Cerrar el mapa"
		class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-indor-black/60 backdrop-blur-lg"
		onclick={() => (showMap = false)}
		onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (showMap = false)}
		in:scale
		out:scale
	>
		<h3 class="flex items-center gap-3 text-center text-3xl font-bold text-indor-orange">
			<MapPin size={32} strokeWidth={2} />¡AQUÍ ESTAMOS!<MapPin size={32} strokeWidth={2} />
		</h3>
		<div
			role="button"
			tabindex="-1"
			aria-label="Nada"
			class="relative aspect-9/11 max-h-4/6 w-11/12 max-w-4xl overflow-hidden rounded-2xl border-3 border-indor-black/80 bg-black shadow-lg shadow-indor-brown-light sm:aspect-video"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<button
				class="absolute top-3 right-3 cursor-pointer rounded-full bg-black/50 p-2 transition hover:scale-105 hover:bg-black/70"
				onclick={() => (showMap = false)}
			>
				<X size={20} class="text-gray-200" />
			</button>
			<iframe
				title="Ubicación en Google Maps"
				class="h-full w-full"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.9907126725743!2d-115.45355572421326!3d32.65969128997242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d7710076adf825%3A0x9902a87cb811d9e3!2sIndor%20Club!5e0!3m2!1ses!2smx!4v1761850159405!5m2!1ses!2smx"
				style="border:0;"
				allowfullscreen
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>
{/if}
