<script lang="ts">
	import { goto } from '$app/navigation';

	export let url: string = '/';
	export let text: string = 'Text';
	export let preAction: () => Promise<void> = async () => {};

	let action = async () => {
		await preAction();
		goto(url);
	};
</script>

<button class="rounded-full bg-[#fff200] p-7 text-4xl text-black" on:click={action}>{text}</button>
