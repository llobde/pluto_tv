<script lang="ts">
	import Spacer from "./Spacer.svelte";

	export let users: { name: string; points: number }[] = [
		{ name: 'Emily Jones', points: 1234 },
		{ name: 'David Lee', points: 987 },
		{ name: 'Sophia Williams', points: 876 },
		{ name: 'Michael Chen', points: 765 },
		{ name: 'Mia Davis', points: 654 }
	];
</script>

<div class="mx-auto max-w-lg overflow-hidden rounded-md shadow-md">
	<div class="px-4 py-2 text-white">
		<h2 class="text-7xl font-semibold ">TOP USERS</h2>
	</div>
	<Spacer height="sm"/>
	<ul class="divide-y divide-gray-200 text-white">
		{#each users as { name, points }, i}
			<li class="flex items-center px-6 py-4">
				<span class="mr-4 text-4xl font-medium ">{i + 1}.</span>
				<div class="flex-1">
					<h3 class="text-4xl font-medium ">{users[i].name}</h3>
					<p class="text-2xl text-white">{users[i].points} points</p>
				</div>
			</li>
		{/each}
	</ul>
</div>
