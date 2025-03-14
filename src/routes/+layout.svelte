<script lang="ts">
	import { on } from 'svelte/events';
	import '../app.css';
	import { onMount } from 'svelte';
	let { children } = $props();
	onMount(async () => {
		
	});
</script>

<main class="h-screen w-screen bg-black">
	{@render children()}
</main>
