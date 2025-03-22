<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { FrontApi } from '$lib/front/front_api';
	import { User } from '$lib/front/user';
	import { searchState } from '$lib/states/state.svelte';
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	let error: boolean = false;

	console.log(searchState.users);

	function onInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		console.log(event);
	}

	let onFocusName = () => {
		console.log('focus name');
		if ('virtualKeyboard' in navigator) {
			navigator.virtualKeyboard.overlaysContent = true;
			navigator.virtualKeyboard.show();
		}
	};

	let onFocusCompany = () => {
		console.log('focus company');
	};

	let addUser = async () => {
		let nameInput = document.getElementById('name') as HTMLInputElement;
		let companyInput = document.getElementById('company') as HTMLInputElement;
		if (!nameInput.value || !companyInput.value) {
			error = true;
			return false;
		}
		console.log(nameInput.value);
		console.log(companyInput.value);
		let newUser: User = new User(nameInput.value, '', companyInput.value);
		searchState.users.addNewUser(newUser);
		searchState.user = newUser;
		console.log(searchState.users);
		let api = new FrontApi();
		await api.put(searchState.users);
		return true;
	};

	onMount(() => {
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
</script>

{#if error}
	<div class=" fixed inset-0 flex items-center justify-center bg-[#fff200] bg-opacity-50">
		<div
			class="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg"
		>
			<div class="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						
						<div class="mt-2">
							<p class="text-6xl text-white">
								Por favor, llena todos los campos.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					on:click={() => (error = false)}
					type="button"
					class="inline-flex w-full justify-center rounded-full border border-transparent bg-[#fff200] px-4 py-2 text-6xl font-medium text-black"
				>
					Deacuerdo
				</button>
			</div>
		</div>
	</div>
{/if}

<Section>
	<div class="flex flex-col items-center justify-start">
		<form class="w-full text-white">
			<div class="mb-4">
				<!-- <label class="mb-2 block text-sm font-bold" for="name"> Nombre </label> -->
				<input
					class="fx-element focus:shadow-outline w-full appearance-none rounded-full border-8 border-[#fff200] px-8 py-5 text-5xl leading-tight placeholder-white shadow focus:outline-none"
					id="name"
					type="text"
					placeholder="Nombre"
					on:focus={onFocusName}
				/>
			</div>
			<!-- <Spacer /> -->
			<div class="mb-6">
				<!-- <label class="mb-2 block text-sm font-bold" for="company"> Empresa </label> -->
				<input
					class="fx-element focus:shadow-outline w-full appearance-none rounded-full border-8 border-[#fff200] px-8 py-5 text-5xl leading-tight placeholder-white shadow focus:outline-none"
					id="company"
					type="text"
					placeholder="Empresa"
					on:focus={onFocusCompany}
				/>
			</div>
		</form>
		<Button text="SIGUIENTE" url="/reglas" preAction={addUser} haveEffect={true} />
	</div>
	<!-- KEYBOARD -->
</Section>
