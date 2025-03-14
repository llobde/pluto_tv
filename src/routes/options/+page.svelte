<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { FrontApi } from '$lib/front/front_api';
	import { User } from '$lib/front/user';
	import { searchState } from '$lib/states/state.svelte';

	console.log(searchState.users);

	let addUser = async () => {
		let nameInput = document.getElementById('name') as HTMLInputElement;
		let companyInput = document.getElementById('company') as HTMLInputElement;
		console.log(nameInput.value);
		console.log(companyInput.value);
		let newUser: User = new User(nameInput.value, '', companyInput.value);
		searchState.users.addNewUser(newUser);
		console.log(searchState.users);
		let api  = new FrontApi();
        api.put(searchState.users);
	};
</script>

<section class="flex h-screen w-screen flex-col items-center">
	<div class="flex h-2/3 flex-col items-center justify-between bg-blue-500">
		<Logo />
		<Spacer />
		<form class="w-full text-[#fff200]">
			<div class="mb-4">
				<!-- <label class="mb-2 block text-sm font-bold" for="name"> Nombre </label> -->
				<input
					class="focus:shadow-outline w-full appearance-none rounded-full border-8 px-8 py-5 text-5xl leading-tight shadow focus:outline-none"
					id="name"
					type="text"
					placeholder="Nombre"
				/>
			</div>
			<Spacer />
			<div class="mb-6">
				<!-- <label class="mb-2 block text-sm font-bold" for="company"> Empresa </label> -->
				<input
					class="focus:shadow-outline w-full appearance-none rounded-full border-8 px-8 py-5 text-5xl leading-tight shadow focus:outline-none"
					id="company"
					type="text"
					placeholder="Empresa"
				/>
			</div>
		</form>
		<Button text="SIGUIENTE" url="/reglas" preAction={addUser} />
	</div>
</section>
