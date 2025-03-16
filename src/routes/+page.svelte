<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Ranking from '$lib/components/Ranking.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { Users } from '$lib/front/users.js';
	import { searchState } from '$lib/states/state.svelte';

	let { data } = $props();
	console.log(data);
	let users: Users = new Users();
	users.fromServer(data.props.json);
	console.log(users);
	searchState.users = users;
</script>

<Section>
	<div class="flex h-1/2 flex-col items-center justify-around">
		<!-- <Spacer height="lg"/> -->
		<Logo />
		<!-- <Spacer height="lg"/> -->
		<Button url="/options" text="JUGAR" />
	</div>
	<Spacer height="lg" />
	<div class="h-1/2">
		<Ranking {users} />
	</div>
	<Spacer height="lg" />
</Section>
