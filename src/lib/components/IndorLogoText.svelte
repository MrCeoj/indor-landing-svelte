<script lang="ts">
	import logo_orange from '$lib/assets/logo_orange.svg'
	let { size = 'base' } = $props();
</script>

{#if size == 'base'}
	<span class="flex flex-col items-end">
		<span class="-mb-3 font-kholic text-4xl text-indor-orange inline-flex items-baseline">
			Ind
			<img src={logo_orange} width={19} height={19} alt="o"/>
			r
		</span>
		<span class="font-Nord text-sm font-bold text-white">CLUB</span>
	</span>
{:else if size == 'small'}
	<span class="flex flex-col items-end">
		<span class="-mb-3 font-kholic text-3xl text-indor-orange inline-flex items-baseline">
			Ind
			<img src={logo_orange} width={16} height={16} alt="o"/>
			r
		</span>
		<span class="font-Nord text-xs font-bold text-white">CLUB</span>
	</span>
{:else if size == 'huge'}
	<span class="flex w-fit flex-col items-end">
		<span class="-mb-3 font-kholic text-7xl text-indor-orange inline-flex items-baseline">
			Ind
			<img src={logo_orange} width={38} height={38} alt="o"/>
			r
		</span>
		<span class="font-Nord text-3xl font-bold text-white">CLUB</span>
	</span>
{:else if size == 'large'}
	<span class="flex w-fit flex-col items-end">
		<span class="-mb-3 font-kholic text-5xl text-indor-orange inline-flex items-baseline">
			Ind
			<img src={logo_orange} width={24} height={24} alt="o"/>
			r
		</span>
		<span class="font-Nord text-xl font-bold text-white">CLUB</span>
	</span>
{/if}
