<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Arrows from '$lib/assets/arrows.png';
	import FitText from '$lib/components/FitText.svelte';
</script>

<Section justify="justify-between">
	<Spacer height="lg" />
	<FitText text="Reglas del Juego" />
	<Spacer height="lg" />
	<!-- bg-[#fff200] -->
	<ul class="flex flex-col gap-4">
		<li class="flex items-center justify-start">
			<!-- <img src={Arrows} alt="" class="w-1/6" /> -->
			<Spacer height="lg" vertical={false}/>
			<p class="text-4xl">Usa las teclas de flecha para mover a tu personaje por el laberinto</p>
		</li>
		<li class="flex items-center justify-start">
			<!-- <img src={Arrows} alt="" class="w-1/6" /> -->
			<Spacer height="lg" vertical={false}/>
			<p class="text-4xl">Consigue el mayor número de puntos en 30 segundos</p>
		</li>
		<li class="flex items-center justify-start">
			<!-- <img src={Arrows} alt="" class="w-1/6" /> -->
			<Spacer height="lg" vertical={false}/>
			<p class="text-4xl">Comerse una serie vale 10</p>
		</li>
		<li class="flex items-center justify-start">
			<!-- <img src={Arrows} alt="" class="w-1/6" /> -->
			<Spacer height="lg" vertical={false}/>
			<p class="text-4xl">Comerse un punto vale 1</p>
		</li>
	</ul>
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
