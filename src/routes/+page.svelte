<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Ranking from '$lib/components/Ranking.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { Users } from '$lib/front/users.js';
	import { searchState } from '$lib/states/state.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { animate, stagger } from 'motion';

	let { data } = $props();
	console.log(data);
	let users: Users = new Users();
	users.fromServer(data.props.json);
	console.log(users);
	searchState.users = users;
	let timeout: NodeJS.Timeout;

	// 120000
	function resetTimeout() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			window.location.href = '/call';
		}, 30000);
	}

	onMount(() => {
		resetTimeout();
		animate(
			'.fx-element',
			{
				opacity: [0, 1]
			},
			{
				duration: 0.5,
				delay: stagger(0.3)
			}
		);
	});
	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div on:click={() => resetTimeout()}>
	<Section>
		<div class="mx-auto">
			<Spacer height="lg" />
			<Button url="/form" text="JUGAR" haveEffect={true} />
			<Spacer height="lg" />
			<Ranking {users} />
			<Spacer height="lg" />
		</div>
	</Section>
</div>
