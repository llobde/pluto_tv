<!-- <script lang="ts">
	import Logo from "$lib/components/Logo.svelte";

</script>

<section class="text-white bg-black flex h-screen w-screen flex-col items-center justify-around">
    <Logo width={"1/4"}/>
	<h1>Gracias por jugar</h1>
	<h2>Esperamos que hayas disfrutado de la experiencia</h2>
	<h2>Tus puntos: 2000</h2>
	<h2>Ranking: 1</h2>
	<h2>¡Felicidades!</h2>
	<h3>Si quieres volver a jugar, puedes hacerlo en el siguiente enlace</h3>
	<a href="/options">Volver a jugar</a>
</section> -->
<script>
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import Button from '$lib/components/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	let puntos = 200;
	let ranking = 1;

	function reiniciarJuego() {
		goto('/options');
	}
</script>

<section
	class="text-pacmanYellow font-pixel flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center text-white"
>
	<!-- Logo (reemplazar con una imagen propia) -->
	<div class="mb-6">
		<Logo width={'1/4'} />
	</div>
	<Spacer height="lg" />
	<!-- Mensaje -->
	<h1 class="text-2xl">¡Gracias por jugar!</h1>
	<p class="mt-4 text-lg">Tus puntos: <span class="text-pacmanRed">{puntos}</span></p>
	<p class="text-lg">Ranking: <span class="text-pacmanBlue">{ranking}</span></p>
	<Spacer height="lg" />
	<!-- Botón -->
	<Button text={'VOLVER A JUGAR'} url={'/options'}></Button>
	<!-- <button
		on:click={reiniciarJuego}
		class="bg-pacmanRed mt-6 rounded-lg px-6 py-3 text-lg text-white shadow-md transition hover:bg-red-700"
	>
		Vuelve a jugar
	</button> -->
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
