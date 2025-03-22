<script lang="ts">
	import type { Users } from '$lib/front/users';
	import Spacer from './Spacer.svelte';

	export let users: Users;
	export let showMax: number = 5;
</script>

<div class="mx-auto w-full overflow-hidden rounded-md shadow-md">
	<div class="px-4 py-2 text-white">
		<h2 class="fx-element text-7xl font-semibold">RANKING</h2>
	</div>
	<Spacer height="sm" />
	<ul class="divide-y divide-gray-200 text-white">
		{#if users.users.length === 0}
			<li class="fx-element flex items-center px-6 py-4">
				<p class="text-2xl text-white">Todavia no hay ningún usuario</p>
			</li>
		{/if}
		{#if users.users.length > 0}
			{#each users.users as user, i}
				{#if i < showMax}
					<li class="fx-element flex items-center px-6 py-4">
						<span class="mr-4 text-4xl font-medium">{i + 1}.</span>
						<div class="flex-1">
							<h3 class="text-4xl font-medium">{user.name}</h3>
							<p class="text-2xl text-white">{user.points} points</p>
						</div>
					</li>
				{/if}
			{/each}
		{/if}
	</ul>
</div>
