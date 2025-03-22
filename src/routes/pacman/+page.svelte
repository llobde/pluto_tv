<script lang="ts">
	import { searchState } from '$lib/states/state.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { FrontApi } from '$lib/front/front_api';
	// Assets
	import MrPacman from '$lib/assets/game/pacman.png';
	import Ghost from '$lib/assets/game/ghost.png';
	import dot from '$lib/assets/game/pacman_dot.png';
	// Series
	// import alaska from '$lib/assets/series/alaska.png';
	// import avatar from '$lib/assets/series/avatar.png';
	// import bob from '$lib/assets/series/bob.png';
	// import carly from '$lib/assets/series/carly.png';
	// import conan from '$lib/assets/series/conan.png';
	// import embrujadas from '$lib/assets/series/embrujadas.png';
	// import endeavour from '$lib/assets/series/endeavour.png';
	// import gandia from '$lib/assets/series/gandia.png';
	// import gear from '$lib/assets/series/gear.png';
	// import jersey from '$lib/assets/series/jersey.png';
	// import midsomer from '$lib/assets/series/midsomer.png';
	// import ninja from '$lib/assets/series/ninja.png';
	// import park from '$lib/assets/series/park.png';
	// import perros from '$lib/assets/series/perros.png';
	// import poirot from '$lib/assets/series/poirot.png';
	// import sakura from '$lib/assets/series/sakura.png';
	// import trek from '$lib/assets/series/trek.png';
	// import vivir from '$lib/assets/series/vivir.png';
	// import who from '$lib/assets/series/who.png';
	// import yu from '$lib/assets/series/yu.png';
	import texas from '$lib/assets/game/ghosts/toGame/texas.png';
	import avatar from '$lib/assets/game/ghosts/toGame/avatar.png';
	import bob from '$lib/assets/game/ghosts/toGame/bob.png';
	import yu from '$lib/assets/game/ghosts/toGame/yu.png';
	import vivir from '$lib/assets/game/ghosts/toGame/vivir.png';
	import watch from '$lib/assets/game/ghosts/toGame/watch.png';
	import ninja from '$lib/assets/game/ghosts/toGame/ninja.png';
	import park from '$lib/assets/game/ghosts/toGame/park.png';
	import marine from '$lib/assets/game/ghosts/toGame/marine.png';
	import withc from '$lib/assets/game/ghosts/toGame/embrujadas.png';
	import ende from '$lib/assets/game/ghosts/toGame/ende.png';
	import gear from '$lib/assets/game/ghosts/toGame/gear.png';
	import who from '$lib/assets/game/ghosts/toGame/who.png';
	import trek from '$lib/assets/game/ghosts/toGame/trek.png';
	import blue from '$lib/assets/game/ghosts/toGame/blue.png';
	import jersey from '$lib/assets/game/ghosts/toGame/jersey.png';
	import gandia from '$lib/assets/game/ghosts/toGame/gandia.png';
	import cherif from '$lib/assets/game/ghosts/toGame/cherif.png';
	import carly from '$lib/assets/game/ghosts/toGame/carly.png';
	import v from '$lib/assets/game/ghosts/toGame/v.png';
	import alaska from '$lib/assets/game/ghosts/toGame/alaska.png';
	import p from '$lib/assets/game/ghosts/toGame/p.png';
	import conan from '$lib/assets/game/ghosts/toGame/conan.png';
	const totalSeconds = 60;
	let tileSize: number = 100;
	let gameSize: number;
	let heightSize: number;
	let widthSize: number;
	let refactorHeight: number = 0;
	let secondsLeft: number = 60;

	onMount(async () => {
		gameSize = canvasSize();
		heightSize = gameSize - gameSize * refactorHeight;
		widthSize = gameSize;
		console.log('Game Size', gameSize);
		console.log('Height Size', heightSize);
		console.log('Width Size', widthSize);
		secondsLeft = totalSeconds;
		const pacmanGame = await import('$lib/pacman/pacman');
		let addTo = document.getElementById('game');
		if (!addTo) {
			addTo = document.createElement('div');
			addTo.id = 'game';
			document.body.appendChild(addTo);
		}
		let pacManGame = new pacmanGame.PacMan(
			addTo,
			widthSize,
			heightSize,
			tileSize,
			totalSeconds,
			{
				pacman: MrPacman,
				ghost: Ghost,
				dot: dot
			},
			{
				texas,
				avatar,
				bob,
				yu,
				vivir,
				watch,
				ninja,
				park,
				marine,
				withc,
				ende,
				gear,
				who,
				trek,
				blue,
				jersey,
				gandia,
				cherif,
				carly,
				v,
				alaska,
				p,
				conan
			},
			() => {
				searchState.user.points += 10;
			},
			() => {
				searchState.user.points += 100;
			},
			async () => {
				console.log('Game Over');
				console.log(searchState.user);
				searchState.users.updateUser(searchState.user);
				let api = new FrontApi();
				await api.put(searchState.users);
				goto('/finish');
			},
			() => {
				console.log('Oncount down');
				secondsLeft--;
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
<div class="pointer-events-none fixed h-screen w-screen">
	<div
		class="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[#fff200] bg-opacity-50 text-black m-20"
	>
		<h1 class="text-8xl font-bold">{secondsLeft}</h1>
	</div>
</div>
<div class="flex h-screen flex-col items-center justify-center">
	<section id="game" class="w-[{widthSize}px] h-[{heightSize}px]"></section>
</div>
