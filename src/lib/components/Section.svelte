<script lang="ts">
	import FitText from './FitText.svelte';
	import Logo from './Logo.svelte';
	import Spacer from './Spacer.svelte';
	export let justify: string = 'justify-around';
	export let showFooter: boolean = true;
	export let showTitle: boolean = true;
	let title: string = 'Pluto TV';
</script>

<section class="flex h-screen w-screen flex-col items-center overflow-hidden text-white">
	<div class="flex h-full w-2/3 flex-col justify-center">
		<div class="just flex flex-col items-center {justify} {showFooter ? 'h-2/3' : 'h-full'} pt-20">
			{#if showTitle}
				<FitText text={title} height={'h-1/6'} width={'w-1/3'} />
			{/if}
			<slot></slot>
		</div>
		{#if showFooter}
			<div class="flex h-1/3 w-full items-end justify-end">
				<div class="h-2/12 absolute left-0 mb-20">
					<Logo height={'h-full'} />
				</div>
			</div>
		{/if}
	</div>
</section>
