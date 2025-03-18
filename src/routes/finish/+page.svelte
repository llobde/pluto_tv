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
		goto('/options');
	}
</script>

<Section showTitle={false}>
	<Spacer height="lg" />
	<FitText text={'¡Gracias por jugar!'} width={'w-2/3'} />
	<Spacer />
	<FitText text={`Tus puntos · ${searchState.user.points}`} width={'w-2/4'} />
	<Spacer />
	<FitText text={`Ranking · ${searchState.users.userRanking(searchState.user)}`} width={'w-2/4'} />
	<Spacer />
	<div class="">
		<Button text={'VOLVER A JUGAR'} url={'/pacman'}></Button>
		<Spacer />
		<Button text={'TERMINAR'} url={'/premio'}></Button>
	</div>
</Section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
