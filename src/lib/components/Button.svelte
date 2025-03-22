<script lang="ts">
	import { goto } from '$app/navigation';

	export let url: string = '/';
	export let text: string = 'Text';
	export let preAction: () => Promise<boolean> = async () => {
		return true;
	};
	export let haveEffect: boolean = false;
	export let bg = 'bg-[#fff200]';
	export let textColor = 'text-black';

	let action = async () => {
		let follow = await preAction();
		if (follow) goto(url);
	};
</script>

<button
	class="{haveEffect
		? 'fx-element'
		: ''} w-full rounded-full {bg} p-7 text-4xl font-bold {textColor}"
	on:click={action}>{text}</button
>
