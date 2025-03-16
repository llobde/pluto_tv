<script lang="ts">
	import { searchState } from '$lib/states/state.svelte';
	import { onMount } from 'svelte';
	// Assets
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
	import dot from '$lib/assets/game/pacman_dot.png';

	let tileSize: number = 100;
	let gameSize: number;

	onMount(async () => {
		gameSize = canvasSize();
		const pacmanGame = await import('$lib/pacman/pacman');
		let addTo = document.getElementById('game');
		if (!addTo) {
			addTo = document.createElement('div');
			addTo.id = 'game';
			document.body.appendChild(addTo);
		}
		let pacManGame = new pacmanGame.PacMan(
			addTo,
			gameSize,
			gameSize,
			tileSize,
			{
				pacman: MrPacman,
				ghost: Ghost,
				dot: dot
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
			},
			() => {
				searchState.user.points += 10;
			},
			() => {
				searchState.user.points += 100;
			},
			() => {
				console.log('Game Over');
				console.log(searchState.user);
			}
		);
		await pacManGame.init();
	});

	function canvasSize() {
		const size = Math.min(window.innerHeight, window.innerWidth);
		return size;
	}
</script>

<!-- <section class="pointer-events-none fixed inset-0 z-50">
	<Counter max={6} />
</section> -->

<div class="flex flex-col items-center justify-center h-screen">
	<section id="game" class="w-[{gameSize}px] h-[{gameSize}px]"></section>
</div>
