<script lang="ts">
	import { onMount } from 'svelte';
	import MrPacman from '$lib/assets/game/pacman.png';
	import Ghost from '$lib/assets/game/ghost.png';
	// Series
	import alaska from '$lib/assets/series/alaska.png';
	import avatar from '$lib/assets/series/avatar.png';
	import bob from '$lib/assets/series/bob.png';
	import carly from '$lib/assets/series/carly.png';
	import conan from '$lib/assets/series/conan.png';
	import embrujadas from '$lib/assets/series/embrujadas.png';
	import endeavour from '$lib/assets/series/endeavour.png';
	import gandia from '$lib/assets/series/gandia.png';
	import gear from '$lib/assets/series/gear.png';
	import jersey from '$lib/assets/series/jersey.png';
	import midsomer from '$lib/assets/series/midsomer.png';
	import ninja from '$lib/assets/series/ninja.png';
	import park from '$lib/assets/series/park.png';
	import perros from '$lib/assets/series/perros.png';
	import poirot from '$lib/assets/series/poirot.png';
	import sakura from '$lib/assets/series/sakura.png';
	import trek from '$lib/assets/series/trek.png';
	import vivir from '$lib/assets/series/vivir.png';
	import who from '$lib/assets/series/who.png';
	import yu from '$lib/assets/series/yu.png';
	import Counter from '$lib/components/Counter.svelte';
	onMount(async () => {
		const pacmanGame = await import('$lib/pacman/pacman');
		let addTo = document.getElementById('game');
		if (!addTo) {
			addTo = document.createElement('div');
			addTo.id = 'game';
			document.body.appendChild(addTo);
		}
		let pacManGame = new pacmanGame.PacMan(
			addTo,
			{
				pacman: MrPacman,
				ghost: Ghost
			},
			{
				alaska,
				avatar,
				bob,
				carly,
				conan,
				embrujadas,
				endeavour,
				gandia,
				gear,
				jersey,
				midsomer,
				ninja,
				park,
				perros,
				poirot,
				sakura,
				trek,
				vivir,
				who,
				yu
			}
		);
		await pacManGame.init();
	});
</script>

<!-- <section class="pointer-events-none fixed inset-0 z-50">
	<Counter max={6} />
</section> -->

<section id="game"></section>
