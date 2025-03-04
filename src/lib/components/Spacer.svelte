<script lang="ts">
	export let height: string = 'lg';
</script>

{#if height == 'lg'}
	<div class="h-20"></div>
{:else if height == 'md'}
	<div class="h-10"></div>
{:else if height == 'sm'}
	<div class="h-5"></div>
{:else}
	<div class="h-20"></div>
{/if}
