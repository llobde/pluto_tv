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
		goto('/');
	}

	function iniciarTemporizador() {
		setTimeout(() => {
			reiniciarJuego();
		}, 60000); // 60000 milliseconds = 1 minute
	}

	onMount(() => {
		// iniciarTemporizador();
	});
</script>

<Section showTitle={false} firstColor="#fff200" backgroundColor="#fff200" justify="justify-between">
	<Spacer height="lg" />
	<FitText text="¡Puedes recoger tu premio en la salida!" textColor={"text-black"} haveEffect={true}/>
	<Spacer height="lg" />
	<img  src={botella} alt="botella" class="fx-element m-0" />
	<Spacer height="lg" />
	<Button text="TERMINAR" url="/" haveEffect={true} bg={"bg-[#000000]"} textColor="text-white"></Button>
</Section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
