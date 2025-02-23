<script lang="ts">
    import logo from '$lib/assets/Pluto_TV_Logo_Pluto_Yellow_RGB_cropped.png';
	import Button from '$lib/components/Button.svelte';
</script>

<section class="flex flex-col h-screen w-screen items-center justify-center">
    <img src={logo} alt="Pluto TV Logo" class="w-1/2" />
	<Button url="/play" text="PLAY" />
</section>
