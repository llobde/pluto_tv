<script lang="ts">
	import { goto } from '$app/navigation';

	export let url: string = '/';
	export let text: string = 'Text';
	export let preAction: () => Promise<void> = async () => {};
	export let haveEffect: boolean = false;
	export let bg = 'bg-[#fff200]';
	export let textColor = 'text-black';

	let action = async () => {
		await preAction();
		goto(url);
	};
</script>

<button class="{haveEffect ? 'fx-element': ''} w-full rounded-full {bg} p-7 text-4xl font-bold {textColor}" on:click={action}
	>{text}</button
>
