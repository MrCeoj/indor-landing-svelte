<script lang="ts">
	export let size = 'base';
</script>

{#if size == 'base'}
	<span class="flex flex-col items-end">
		<span class="-mb-3 font-kholic text-4xl text-indor-orange">
			Ind
			<span class="-mx-2.5 inline-block origin-center rotate-50 p-0">o</span>
			r
		</span>
		<span class="font-Nord text-sm font-bold text-white">CLUB</span>
	</span>
{:else if size == 'small'}
	<span class="flex flex-col items-end">
		<span class="-mb-3 font-kholic text-3xl text-indor-orange">
			Ind
			<span class="-mx-2 inline-block origin-center rotate-50 p-0">o</span>
			r
		</span>
		<span class="font-Nord text-xs font-bold text-white">CLUB</span>
	</span>
{:else if size == 'huge'}
	<span class="flex flex-col items-end w-fit">
		<span class="-mb-3 font-kholic text-7xl text-indor-orange">
			Ind
			<span class="-mx-5 inline-block origin-center rotate-50 p-0">o</span>
			r
		</span>
		<span class="font-Nord text-3xl font-bold text-white">CLUB</span>
	</span>
{:else if size == 'large'}
	<span class="flex flex-col items-end w-fit">
		<span class="-mb-3 font-kholic text-5xl text-indor-orange">
			Ind
			<span class="-mx-3.5 inline-block origin-center rotate-50 p-0">o</span>
			r
		</span>
		<span class="font-Nord text-xl font-bold text-white">CLUB</span>
	</span>
{/if}
