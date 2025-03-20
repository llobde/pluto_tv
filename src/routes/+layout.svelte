<script lang="ts">
	import { on } from 'svelte/events';
	import '../app.css';
	import { onMount } from 'svelte';
	let { children } = $props();
	onMount(async () => {
		
	});
</script>

<!-- <svelte:head> 
<link rel="preload" as="font" href="/fonts/custom-font.woff2" type="font/woff2" crossorigin="anonymous"> 
</svelte:head> -->

<main class="h-screen w-screen bg-black">
	{@render children()}
</main>
