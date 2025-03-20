<script>
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import botella from '$lib/assets/botella_pluto.png';
	import Section from '$lib/components/Section.svelte';
	import { searchState } from '$lib/states/state.svelte';
	import { onMount } from 'svelte';
	import FitText from '$lib/components/FitText.svelte';

	onMount(async () => {});

	function reiniciarJuego() {
		goto('/');
	}

	function iniciarTemporizador() {
		setTimeout(() => {
			reiniciarJuego();
		}, 60000); // 60000 milliseconds = 1 minute
	}

	onMount(() => {
		iniciarTemporizador();
	});
</script>

<Section showTitle={false}>
	<Spacer height="lg" />
	<FitText text="¡Puedes recoger tu premio en la entrada!" />
	<Spacer height="lg" />
	<img src={botella} alt="botella" />
</Section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
