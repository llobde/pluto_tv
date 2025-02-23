<script lang="ts">
	import hand_l from '$lib/assets/hand_left.svg';
	import hand_r from '$lib/assets/hand_right.svg';
	import alaska from '$lib/assets/pnjs/alaska.png';
	import avatar from '$lib/assets/pnjs/avatar.png';
	import bob from '$lib/assets/pnjs/bob.png';
	import carly from '$lib/assets/pnjs/carly.png';
	import conan from '$lib/assets/pnjs/conan.png';
	import embrujadas from '$lib/assets/pnjs/embrujadas.png';
	import endeavour from '$lib/assets/pnjs/endeavour.png';
	import gandia from '$lib/assets/pnjs/gandia.png';
	import gear from '$lib/assets/pnjs/gear.png';
	import jersey from '$lib/assets/pnjs/jersey.png';
	import midsomer from '$lib/assets/pnjs/midsomer.png';
	import ninja from '$lib/assets/pnjs/ninja.png';
	import park from '$lib/assets/pnjs/park.png';
	import perros from '$lib/assets/pnjs/perros.png';
	import poirot from '$lib/assets/pnjs/poirot.png';
	import sakura from '$lib/assets/pnjs/sakura.png';
	import trek from '$lib/assets/pnjs/trek.png';
	import vivir from '$lib/assets/pnjs/vivir.png';
	import who from '$lib/assets/pnjs/who.png';
	import yu from '$lib/assets/pnjs/yu.png';

	import { onDestroy, onMount } from 'svelte';
	let loaded: boolean = false;
	let removeCanvas = () => {
		let prevCanvas = document.getElementsByTagName('canvas');
		for (const canvas of prevCanvas) {
			canvas.remove();
		}
	};

	onMount(async () => {
		removeCanvas();
		const GameSketch = await import('$lib/game/gameScketch');
		new GameSketch.GameSketch(() => (loaded = true), hand_l, hand_r, [
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
		]);
	});

	onDestroy(() => {
		console.log('the component is being destroyed');
		removeCanvas();
	});
</script>

<section class="fixed flex h-screen w-screen flex-col items-center justify-center">
	{#if !loaded}
		<p class="text-white">Loading...</p>
	{:else}
		<a href="/" class="text-white">Back</a>
	{/if}
</section>
