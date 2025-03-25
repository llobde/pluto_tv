<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Hello from the other side');
		window.addEventListener('gamepadconnected', (e) => {
			console.log(
				'Gamepad connected at index %d: %s. %d buttons, %d axes.',
				e.gamepad.index,
				e.gamepad.id,
				e.gamepad.buttons.length,
				e.gamepad.axes.length
			);
		});
		window.addEventListener('gamepaddisconnected', (e) => {
			console.log('Gamepad disconnected from index %d: %s', e.gamepad.index, e.gamepad.id);
		});
	});
</script>
