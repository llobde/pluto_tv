<script>
	import Button from "$lib/components/Button.svelte";


	import Logo from "$lib/components/Logo.svelte";
	import Spacer from "$lib/components/Spacer.svelte";

</script>
<section class="fixed flex h-screen w-screen flex-col items-center justify-center">
    <Logo width={"1/4"}/>
    <Spacer height="lg"/>
    <Button url="/couples" text="COUPLES" />
    <Spacer height="lg"/>
    <Button url="/pacman" text="PACMAN" />
</section>