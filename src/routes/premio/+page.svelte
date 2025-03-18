<script>
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import botella from '$lib/assets/botella_pluto.png';
	import Section from '$lib/components/Section.svelte';
	import { searchState } from '$lib/states/state.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {});

	function reiniciarJuego() {
		goto('/options');
	}
</script>

<Section>
	<Spacer height="lg" />
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-1">
			<!-- Content for the first column -->
			<div>
				<h1 class="text-2xl">¡Gracias por jugar!</h1>
				<p class="mt-4 text-lg">
					Tus puntos: <span class="text-pacmanRed">{searchState.user.points}</span>
				</p>
				<p class="text-lg">
					Ranking: <span class="text-pacmanBlue"
						>{searchState.users.userRanking(searchState.user)}</span
					>
				</p>
			</div>
		</div>
		<div class="col-span-1">
			<!-- Content for the second column -->
			<div>
				<img src={botella} alt="botella" />
			</div>
		</div>
		<div class="col-span-1">
			<!-- Content for the third column -->
			<Button text={'VOLVER A JUGAR'} url={'/pacman'}></Button>
		</div>
	</div>
	<Spacer height="lg" />
</Section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
