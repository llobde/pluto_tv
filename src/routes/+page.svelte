<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Ranking from '$lib/components/Ranking.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
</script>

<section class="flex h-screen w-screen flex-col items-center">
	<div class="flex h-1/2 flex-col items-center justify-around">
		<!-- <Spacer height="lg"/> -->
		<Logo />
		<!-- <Spacer height="lg"/> -->
		<Button url="/options" text="PLAY" />
	</div>
	<Spacer height="lg" />
	<div class="h-1/2">
		<Ranking />
	</div>
	<Spacer height="lg" />
</section>
