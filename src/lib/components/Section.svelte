<script lang="ts">
    export let justify: string = 'justify-between';
</script>

<section class="flex h-screen w-screen flex-col items-center overflow-hidden text-white">
	<div class="flex flex-col items-center {justify} w-1/2 h-full">
		<slot></slot>
	</div>
</section>
