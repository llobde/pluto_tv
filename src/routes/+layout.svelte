<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="h-screen w-screen bg-black">
	{@render children()}
</main>
