<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Arrows from '$lib/assets/arrows.png';
	import dot from '$lib/assets/game/pacman_dot.png';
	import FitText from '$lib/components/FitText.svelte';
	import Circle from '$lib/components/Circle.svelte';
</script>

<Section justify="justify-between">
	<Spacer height="lg" />
	<FitText text="Reglas del Juego" />
	<Spacer height="lg" />
	<ul class="flex list-decimal flex-col gap-10">
		<li class="flex items-center justify-start">
			<!-- <img src={dot} alt="" class="w-[40px]" /> -->
			<Circle />
			<Spacer height="lg" vertical={false} />
			<p class="text-4xl">Consigue el mayor número de puntos en 30 segundos</p>
		</li>
		<li class="flex items-center justify-start">
			<!-- <img src={dot} alt="" class="w-[40px]" /> -->
			<Circle />
			<Spacer height="lg" vertical={false} />
			<p class="text-4xl">Usa las teclas de flecha para mover el logo de Pluto TV por el laberinto</p>
		</li>
		<li class="flex items-center justify-start">
			<!-- <img src={dot} alt="" class="w-[40px]" /> -->
			<Circle />
			<Spacer height="lg" vertical={false} />
			<p class="text-4xl">Comerse un personaje vale 10</p>
		</li>
		<li class="flex items-center justify-start">
			<!-- <img src={dot} alt="" class="w-[40px]" /> -->
			<Circle />
			<Spacer height="lg" vertical={false} />
			<p class="text-4xl">Comerse un punto vale 1</p>
		</li>
	</ul>
	<Spacer height="lg" />
	<Button url="/pacman" text="EMPEZAR" />
</Section>
