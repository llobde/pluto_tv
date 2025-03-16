<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
</script>

<Section justify="justify-start">
	<Spacer height="lg" />
	<h2 class="text-9xl">Reglas del Juego</h2>
	<Spacer height="lg" />
	<div class="grid grid-cols-2 gap-4">
		<div class="rounded-lg bg-[#fff200] p-4 text-black">
			<h3 class="text-6xl">Controles</h3>
			<Spacer height="lg" />
			<p class="text-4xl">Usa las teclas de flecha para mover a tu personaje por el laberinto</p>
		</div>
		<div class="rounded-lg bg-[#fff200] p-4 text-black">
			<h3 class="text-6xl">Objetivo</h3>
			<Spacer height="lg" />
			<p class="text-4xl">Consigue el mayor número de puntos en 30 segundos</p>
		</div>
		<div class="rounded-lg bg-[#fff200] p-4 text-black">
			<h3 class="text-6xl">Series</h3>
			<Spacer height="lg" />
			<p class="text-4xl">Comerse una serie vale 10</p>
		</div>
		<div class="rounded-lg bg-[#fff200] p-4 text-black">
			<h3 class="text-6xl">Puntos</h3>
			<Spacer height="lg" />
			<p class="text-4xl">Comerse un punto vale 1</p>
		</div>
	</div>
    <Spacer height="lg" />
	<Button url="/pacman" text="EMPEZAR" />
	<!-- <ul class="text-5xl">
		<li>1. Usa las teclas de flecha para mover a tu personaje.</li>
		<li>2. Come todos los puntos en el laberinto para avanzar al siguiente nivel.</li>
		<li>3. Evita a los fantasmas, si te atrapan perderás una vida.</li>
		<li>4. Come las frutas para obtener puntos extra.</li>
		<li>5. Tienes tres vidas al comenzar el juego.</li>
		<li>6. El juego termina cuando pierdes todas tus vidas.</li>
	</ul> -->
</Section>
