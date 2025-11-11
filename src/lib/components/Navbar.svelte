<script lang="ts">
	import {
		Menu,
		X,
		ChevronDown,
		Calendar,
		UtensilsCrossed,
		Store,
		CircleQuestionMark,
		House
	} from 'lucide-svelte';
	import { scale, slide, fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import IndorLogoText from './IndorLogoText.svelte';
	import { goto } from '$app/navigation';

	let options = [
		{ name: 'Inicio', href: '/', icon: House },
		{ name: 'Servicios', href: '/servicios', icon: UtensilsCrossed },
		{ name: 'Reservas & Clases', href: '/reservaciones', icon: Calendar },
		{ name: 'Nuestra Merch', href: '/merch', icon: Store },
		{ name: '¿Quiénes somos?', href: '/nosotros', icon: CircleQuestionMark }
	];

	let optionsCollapsed = [
		{
			name: 'Con Nosotros',
			options: [
				{ name: 'Inicio', href: '/', icon: House },
				{ name: 'Servicios', href: '/servicios', icon: UtensilsCrossed },
				{ name: 'Reservas & Clases', href: '/reservaciones', icon: Calendar }
			]
		},
		{
			name: 'Sobre Nosotros',
			options: [
				{ name: 'Nuestra Merch', href: '/merch', icon: Store },
				{ name: '¿Quiénes somos?', href: '/nosotros', icon: CircleQuestionMark }
			]
		}
	];

	let OptionsDisplayed = $state([false, false]);
	let menuOpen = $state(false); // Add a new state variable to track the interaction type
	let lastInteractionWasKeyboard = $state(false);

	const toggleMenu = (event?: MouseEvent | KeyboardEvent) => {
		lastInteractionWasKeyboard = event instanceof KeyboardEvent;
		menuOpen = !menuOpen;
	};

	let menuButtons: (HTMLButtonElement | null)[] = [null, null];

	const toggleOptions = async (idx: number, event?: Event) => {
		const currentlyOpen = OptionsDisplayed[idx];
		OptionsDisplayed = [false, false];
		OptionsDisplayed[idx] = !currentlyOpen;

		const isKeyboardEvent = event instanceof KeyboardEvent;

		if (OptionsDisplayed[idx] && isKeyboardEvent) {
			await tick();
			const menu = document.querySelector<HTMLElement>(`#menu-${idx}`);
			menu?.querySelector<HTMLAnchorElement>('a')?.focus();
		}
	};

	const closeAllMenus = (returnFocusToIdx?: number) => {
		menuOpen = false;
		OptionsDisplayed[0] = false;
		OptionsDisplayed[1] = false;

		if (returnFocusToIdx !== undefined) {
			menuButtons[returnFocusToIdx]?.focus();
		}
	};

	function focusTrap(node: HTMLElement) {
		const previousActiveElement = document.activeElement as HTMLElement;
		const shouldFocus = lastInteractionWasKeyboard;

		const focusableElements = node.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
		);

		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (shouldFocus) {
			firstElement.focus();
		}

		function handleKeydown(event: KeyboardEvent) {
			if (event.key !== 'Tab') return;

			if (event.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					lastElement.focus();
					event.preventDefault();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					firstElement.focus();
					event.preventDefault();
				}
			}
		}

		node.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydown);
				previousActiveElement?.focus();
			}
		};
	}

	function arrowKeyNavigation(node: HTMLElement) {
		const links = Array.from(node.querySelectorAll<HTMLAnchorElement>('a'));

		function handleKeydown(event: KeyboardEvent) {
			const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
			let nextIndex = currentIndex;

			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					nextIndex = (currentIndex + 1) % links.length;
					links[nextIndex]?.focus();
					break;
				case 'ArrowUp':
					event.preventDefault();
					nextIndex = (currentIndex - 1 + links.length) % links.length;
					links[nextIndex]?.focus();
					break;
				case ' ':
				case 'Spacebar':
				case 'Space':
				case 'Enter':
					event.preventDefault();
					const activeLink =
						links[currentIndex] ?? (document.activeElement as HTMLAnchorElement | null);
					if (activeLink instanceof HTMLAnchorElement) {
						activeLink.click();
					}
					break;
				case 'Escape':
					closeAllMenus();
					break;
			}
		}

		node.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydown);
			}
		};
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			if (menuOpen) {
				toggleMenu();
			} else if (OptionsDisplayed[0]) {
				closeAllMenus(0);
			} else if (OptionsDisplayed[1]) {
				closeAllMenus(1);
			}
		}
	}}
/>

<nav
	class="fixed top-0 z-50 w-full border-b border-indor-orange/20 bg-indor-black/70 backdrop-blur-2xl"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-17 items-center justify-between md:h-20">
			<a in:scale={{ duration: 400 }} class="flex items-center space-x-2" href="/">
				<IndorLogoText />
			</a>

			<div in:fade={{ delay: 200 }} class="hidden gap-4 text-sm lg:flex xl:text-base" role="menu">
				{#each options as o, i}
					<a
						href={o.href}
						class="rounded-sm px-2 py-1 font-semibold outline outline-transparent transition-colors hover:text-indor-orange focus:scale-105 focus:text-indor-orange"
						role="menuitem"
						tabindex="0"
						in:slide={{ delay: 100 * i }}
					>
						{o.name}
					</a>
				{/each}
			</div>

			<div
				in:fade={{ delay: 200 }}
				class="hidden w-1/2 justify-around text-sm font-bold sm:flex md:text-lg lg:hidden"
			>
				{#each optionsCollapsed as o, i}
					<div class="relative">
						<button
							type="button"
							class="flex cursor-pointer items-center gap-2 rounded-sm p-3 outline outline-transparent transition-colors hover:scale-105 hover:text-indor-orange focus:scale-105 focus:text-indor-orange focus:outline-indor-orange"
							in:slide={{ delay: 100 * i }}
							onclick={() => toggleOptions(i)}
							aria-haspopup="true"
							aria-expanded={OptionsDisplayed[i]}
							aria-controls="menu-{i}"
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									toggleOptions(i, e);
								}
							}}
							bind:this={menuButtons[i]}
						>
							{o.name}
							<ChevronDown
								size={16}
								class="transition-transform {OptionsDisplayed[i] ? 'rotate-180' : ''}"
							/>
						</button>

						{#if OptionsDisplayed[i]}
							<ul
								class="absolute top-full -left-3 mt-2 flex w-54 flex-col gap-2 rounded-lg border border-indor-orange/20 bg-indor-black/95 p-3 font-semibold text-gray-300 shadow-lg backdrop-blur-xl"
								in:slide
								out:slide
								onfocusout={(e) => {
									if (!e.currentTarget.contains(e.relatedTarget as Node)) {
										closeAllMenus();
									}
								}}
								role="menu"
								aria-label={o.name}
								id="menu-{i}"
								use:arrowKeyNavigation
							>
								{#each o.options as ops, j}
									<li role="presentation">
										<a
											href={ops.href}
											class="text-md flex items-center gap-2 px-2 py-1 outline outline-indor-black transition-colors hover:text-indor-orange focus:bg-indor-orange focus:text-indor-black focus:outline-indor-orange"
											in:fade={{ delay: 100 * j }}
											role="menuitem"
											tabindex="-1"
										>
											<ops.icon size={20} />
											{ops.name}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>

			<button
				in:scale={{ delay: 300 }}
				onclick={() => {
					goto('/reservaciones');
				}}
				class="md:text-md hidden rounded-lg bg-linear-to-r from-orange-600 to-amber-500 px-4 py-2 font-Nord text-sm font-semibold outline outline-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-600/80 focus:scale-105 focus:shadow-lg focus:shadow-indor-orange/50 focus:outline-indor-orange sm:block"
			>
				Reserva ahora
			</button>

			<button
				onclick={(e) => toggleMenu(e)}
				onkeypress={(e) => toggleMenu(e)}
				class="text-white sm:hidden"
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
			>
				{#if menuOpen}
					<X size={28} />
				{:else}
					<Menu size={28} />
				{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div
			in:slide={{ duration: 250 }}
			out:slide={{ duration: 200 }}
			class="border-t border-indor-orange/20 bg-indor-black sm:hidden"
			use:focusTrap
		>
			<div
				class="flex flex-col items-center space-y-3 px-4 py-4 text-center font-semibold"
				role="menu"
				aria-label="Apartados"
				use:arrowKeyNavigation
			>
				{#each options as o, i}
					<a
						href={o.href}
						class="flex w-full items-center justify-between gap-2 rounded-lg border-b border-indor-orange/10 px-10 py-2 outline outline-transparent transition-all hover:bg-indor-orange hover:text-indor-black focus:bg-indor-orange focus:text-indor-black focus:outline-indor-orange sm:w-4/5"
						onclick={toggleMenu}
						role="menuitem"
						aria-label={o.name}
						in:fade={{ delay: 100 * i }}
					>
						<o.icon size={16} />
						{o.name}
						<o.icon size={16} />
					</a>
				{/each}

				<button
					onclick={() => {
						goto('reservaciones');
					}}
					class="relative w-full overflow-hidden rounded-xl bg-linear-to-r from-orange-600 to-amber-500 px-6 py-3 font-Nord text-lg font-bold text-white shadow-2xl shadow-orange-600/50 transition-transform duration-300 before:absolute before:inset-0 before:-left-full before:bg-linear-to-r before:from-transparent before:via-amber-500/30 before:to-transparent before:transition-all before:duration-500 hover:scale-105 hover:shadow-orange-600/80 hover:before:left-full focus:scale-105 focus:before:left-full lg:px-8 lg:py-4 lg:text-lg"
				>
					Reserva ahora
				</button>
			</div>
		</div>
	{/if}
</nav>
