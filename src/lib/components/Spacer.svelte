<script lang="ts">
	export let height: string = 'lg';
	export let vertical: boolean = true;
</script>
{#if vertical}
	{#if height == 'lg'}
		<div class="h-20"></div>
	{:else if height == 'md'}
		<div class="h-10"></div>
	{:else if height == 'sm'}
		<div class="h-5"></div>
	{:else}
		<div class="h-20"></div>
	{/if}
{:else}
	{#if height == 'lg'}
		<div class="w-20"></div>
	{:else if height == 'md'}
		<div class="w-10"></div>
	{:else if height == 'sm'}
		<div class="w-5"></div>
	{:else}
		<div class="w-20"></div>
	{/if}
{/if}

<!-- {#if height == 'lg'}
	<div class="h-20"></div>
{:else if height == 'md'}
	<div class="h-10"></div>
{:else if height == 'sm'}
	<div class="h-5"></div>
{:else}
	<div class="h-20"></div>
{/if} -->
