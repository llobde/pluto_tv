<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Section from '$lib/components/Section.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { FrontApi } from '$lib/front/front_api';
	import { User } from '$lib/front/user';
	import { searchState } from '$lib/states/state.svelte';
	import { animate, stagger } from 'motion';
	import type SimpleKeyboard from 'simple-keyboard';
	import { onMount } from 'svelte';
	// import Keyboard from 'simple-keyboard';
	let error: boolean = false;
	let focused: boolean = false;
	let focusedCompany: boolean = false;
	let focusedName: boolean = false;

	console.log(searchState.users);

	// const keyboard = new Keyboard({
	// 	onChange: (input) => console.log('Input changed', input),
	// 	onKeyPress: (button) => console.log('Button pressed', button)
	// });

	function onInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		console.log(event);
	}

	let handleShiftButton = () => {
		let currentLayout = keyboard.options.layoutName;
		let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

		keyboard.setOptions({
			layoutName: shiftToggle
		});
	};

	let onKey = (button: any) => {
		console.log('Button pressed', button);

		/**
		 * Shift functionality
		 */
		if (button === '{lock}' || button === '{shift}') handleShiftButton();
	};

	let positionKeyboard = (e: any) => {
		console.log('position keyboard');
		let target = e.target;
		const rect = target.getBoundingClientRect();
		console.log('rect', rect);
		const x = rect.x;
		const y = rect.y;
		const bottom = rect.bottom;
		const k = document.getElementById('k');
		console.log(k);
		if (k) {
			k.style.display = 'block';
			k.style.position = 'absolute';
			k.style.left = `${x}px`;
			k.style.top = `${y + rect.height}px`;
			k.style.width = `${rect.width}px`;
			k.style.zIndex = '100';
		}
	};

	let hideKeyboard = () => {
		console.log('hide keyboard');
		focused = false;
		focusedCompany = false;
		focusedName = false;
		const k = document.getElementById('k');
		console.log(k);
		if (k) {
			k.style.position = 'absolute';
			k.style.display = 'none';
			k.style.zIndex = '100';
		}
	};

	let onFocusName = (e: any) => {
		focused = true;
		focusedName = true;
		keyboard.setOptions({
			inputName: e.target.id
		});
		positionKeyboard(e);
	};

	let onFocusCompany = (e: any) => {
		focused = true;
		focusedCompany = true;
		keyboard.setOptions({
			inputName: e.target.id
		});
		positionKeyboard(e);
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

	let keyboard: SimpleKeyboard;

	onMount(async () => {
		const Keyboard = await import('simple-keyboard');
		keyboard = new Keyboard.default({
			onChange: (input) => {
				console.log('Input changed', input);
				if (focusedName) {
					let nameInput = document.getElementById('name') as HTMLInputElement;
					nameInput.value = input;
				}
				if (focusedCompany) {
					let companyInput = document.getElementById('company') as HTMLInputElement;
					companyInput.value = input;
				}
			},
			onKeyPress: (button) => {
				console.log('Button pressed', button);
				onKey(button);
			},
			stopMouseDownPropagation: true,
			stopMouseUpPropagation: true,
			layout: {
				default: [
					'1 2 3 4 5 6 7 8 9 0 {bksp}',
					'q w e r t y u i o p',
					'a s d f g h j k l',
					'{shift} z x c v b n m , . {shift}',
					'{space}'
				],
				shift: [
					'! @ # $ % ^ & * ( ) {bksp}',
					'Q W E R T Y U I O P',
					'A S D F G H J K L',
					'{shift} Z X C V B N M , . {shift}',
					'{space}'
				]
			},
			display: {
				'{bksp}': '⌫',
				'{shift}': '⇧',
				'{space}': ' ',
				'{enter}': '↵'
			}
		});

		hideKeyboard();
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
	<div class=" bg-opacity-50 fixed inset-0 flex items-center justify-center bg-[#fff200]">
		<div
			class="transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg"
		>
			<div class="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<div class="mt-2">
							<p class="text-6xl text-white">Por favor, llena todos los campos.</p>
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

<div
	class="{focused ? '' : 'hidden'} absolute top-0 left-0 z-10 h-screen w-screen bg-transparent"
	on:click={() => hideKeyboard()}
></div>
<div id="k" class="simple-keyboard absolute z-20"></div>

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
					autocomplete="off"
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
					autocomplete="off"
					on:focus={onFocusCompany}
				/>

				<!-- <div class="{focusedCompany ? '' : 'hidden'} ">
					<div id="k" class="simple-keyboard"></div>
				</div> -->
			</div>
		</form>
		<Button text="SIGUIENTE" url="/reglas" preAction={addUser} haveEffect={true} />
	</div>
	<!-- KEYBOARD -->
</Section>
