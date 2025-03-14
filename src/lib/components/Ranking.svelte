<script lang="ts">
	import type { Users } from "$lib/front/users";
	import Spacer from "./Spacer.svelte";

	export let users: Users;
</script>

<div class="mx-auto max-w-lg overflow-hidden rounded-md shadow-md">
	<div class="px-4 py-2 text-white">
		<h2 class="text-7xl font-semibold ">TOP USERS</h2>
	</div>
	<Spacer height="sm"/>
	<ul class="divide-y divide-gray-200 text-white">
		{#each users.users as user, i}
			<li class="flex items-center px-6 py-4">
				<span class="mr-4 text-4xl font-medium ">{i + 1}.</span>
				<div class="flex-1">
					<h3 class="text-4xl font-medium ">{user.name}</h3>
					<p class="text-2xl text-white">{user.points} points</p>
				</div>
			</li>
		{/each}
	</ul>
</div>
