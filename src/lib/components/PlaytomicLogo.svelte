<script lang="ts">
	export let clas = "";
	export let strokeColor = 'black';
	export let fillColor = 'none';
	export let size = 128;
</script>

<svg
	viewBox="0 0 170 170"
	width={size}
	height={size}
    class={clas}
>
	<path
		d="M67.3,1.13H.69V133H37.21v37.87H67.3c27.55,0,50-21.09,50-47V48.14C117.26,22.22,94.85,1.13,67.3,1.13Zm-5.85,158H48.92v-64H61.45Zm44.11-35.3c0,17.63-14.08,32.28-32.4,34.89v-26.1c15.06-1.8,26.9-9.67,32.4-18.58Zm0-37.86c0,17.62-14.09,32.23-32.4,34.84v-26c15.06-1.8,26.9-9.67,32.4-18.58ZM67.3,83.44H37.21V121.3H12.4V12.84H67.3c21.1,0,38.26,15.84,38.26,35.3S88.4,83.44,67.3,83.44Z"
		fill={fillColor}
		stroke={strokeColor}
		stroke-width="2"
	/>
</svg>
