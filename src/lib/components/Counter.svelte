<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	export let max: number = 5;

	onMount(async () => {
		const count = document.getElementById('count');
		animate(max, 0, {
			duration: max,
			ease: 'circOut',
			onUpdate: (latest) => {
				if (count) {
					count.innerHTML = Math.round(latest).toString();
				}
			}
		});
	});
</script>

<pre id="count">{max}</pre>

<style>
	#count {
		font-size: 64px;
		color: #4ff0b7;
	}
</style>
