<script lang="ts">
	import FitText from './FitText.svelte';
	import Logo from './Logo.svelte';
	import Spacer from './Spacer.svelte';
	export let justify: string = 'justify-around';
	export let showFooter: boolean = true;
	export let showTitle: boolean = true;
	let title: string = 'EL COMECOCOS DE LA NOSTALGIA';
</script>

<section class="flex h-screen w-screen flex-col items-center overflow-hidden text-white">
	<div class=" flex h-full w-2/3 flex-col justify-center">
		<div class="just flex flex-col items-center {justify} {showFooter ? 'h-2/3' : 'h-full'}  pt-20">
			{#if showTitle}
				<FitText text={title} height={'h-1/6'} width={'w-full'} />
			{/if}
			<slot></slot>
			<Spacer />
		</div>
		{#if showFooter}
			<div class="flex h-1/3 w-full items-center justify-center bg-[#fff200]">
				<div class="">
					<Logo height={'h-full'} width={'w-2/3'} isBlack={true} margin={'m-0'} />
				</div>
			</div>
		{/if}
	</div>
</section>
