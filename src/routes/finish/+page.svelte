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
	import { animate, stagger } from 'motion';

	onMount(() => {
		animate(
			'.fx-element',
			{
				opacity: [0, 1]
			},
			{
				duration: 0.5,
				delay: stagger(0.3)
			}
		);
	});

	function reiniciarJuego() {
		goto('/options');
	}
</script>

<Section showTitle={false}>
	<Spacer height="lg" />
	<FitText text={'¡Gracias por jugar!'} width={'w-2/3'}  haveEffect={true}/>
	<Spacer />
	<FitText text={`Tus puntos · ${searchState.user.points}`} width={'w-2/4'} haveEffect={true}/>
	<Spacer />
	<FitText text={`Ranking #${searchState.users.userRanking(searchState.user)}`} width={'w-2/4'} haveEffect={true}/>
	<Spacer />
	<div class="">
		<Button text={'VOLVER A JUGAR'} url={'/pacman'} haveEffect={true}></Button>
		<Spacer />
		<Button text={'TERMINAR'} url={'/premio'} haveEffect={true}></Button>
	</div>
</Section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
