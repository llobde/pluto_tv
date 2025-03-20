<script lang="ts">
	import logo from '$lib/assets/plto_logo.png';
	import logoBlack from '$lib/assets/pluto_logo_black.png';
	export let height: string = 'h-1/2';
	export let width: string = 'w-1/2';
	export let margin: string = 'ml-20';
	export let isBlack: boolean = false;
</script>

<img src={isBlack ? logoBlack: logo} alt="Pluto TV Logo" class="{height} {width} {margin}" />
