<script lang="ts">
	import logo from '$lib/assets/pluto_tv_logo.svg?raw';
	import { onMount } from 'svelte';
	import { animate, stagger, transform, spring } from 'motion';
	import video from '$lib/assets/videos/PlutoTV_Logo_Animation_SP_NEW_TAGLINE_9x16.mp4';
	import s1 from '$lib/assets/pluto/series_names/Alaska_2.jpg';
	import s2 from '$lib/assets/pluto/series_names/Avatar_2.jpg';
	import s3 from '$lib/assets/pluto/series_names/Bob_2.jpg';
	import s4 from '$lib/assets/pluto/series_names/Carly_2.jpg';
	import s5 from '$lib/assets/pluto/series_names/Conan_2.jpg';
	import s6 from '$lib/assets/pluto/series_names/Embrujadas_2.jpg';
	import s7 from '$lib/assets/pluto/series_names/Endeavour_2.jpg';
	import s8 from '$lib/assets/pluto/series_names/Gandia_2.jpg';
	import s9 from '$lib/assets/pluto/series_names/Gear_2.jpg';
	import s10 from '$lib/assets/pluto/series_names/Jersey_2.jpg';
	import s11 from '$lib/assets/pluto/series_names/Midsomer_2.jpg';
	import s12 from '$lib/assets/pluto/series_names/Ninja_2.jpg';
	import s13 from '$lib/assets/pluto/series_names/Park_2.jpg';
	import s14 from '$lib/assets/pluto/series_names/Perros_2.jpg';
	import s15 from '$lib/assets/pluto/series_names/Poirot_2.jpg';
	import s16 from '$lib/assets/pluto/series_names/Sakura_2.jpg';
	import s17 from '$lib/assets/pluto/series_names/Trek_2.jpg';
	import s18 from '$lib/assets/pluto/series_names/Vivir_2.jpg';
	import s19 from '$lib/assets/pluto/series_names/Who_2.jpg';
	import s20 from '$lib/assets/pluto/series_names/Yu_2.jpg';

	let series: string[] = [
		s1,
		s2,
		s3,
		s4,
		s5,
		s6,
		s7,
		s8,
		s9,
		s10,
		s11,
		s12,
		s13,
		s14,
		s15,
		s16,
		s17,
		s18,
		s19,
		s20
	];

	function shuffleSeries(array: string[]): string[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	series = shuffleSeries(series);

	let fiveSeries = () => {
		return series.slice(0, 5);
	};

	onMount(() => {
		console.log('mounted');
		// let logo = document.getElementsByTagName('svg');
		// let transformer = transform([0, 1], [0, 1]);
		if (logo.length > 0) {
			let svg = logo[0];
		}
		let seq: any[] = [
			// [
			// 	'#logo',
			// 	{
			// 		scale: [1, 0]
			// 	},
			// 	{
			// 		duration: 1,
			// 		ease: 'easeInOut',
			// 		delay: 3
			// 	}
			// ],
			[
				'.circle',
				{
					scale: [0, 25]
				},
				{
					duration: 2,
					ease: 'easeInOut',
					delay: stagger(1),
					at: 3
				}
			],
			[
				'.serie',
				{
					opacity: [0, 1],
					// left: [0, 50],
					transform: 'translateX(100px)'
				},
				{
					duration: 0.8,
					ease: 'easeInOut',
					delay: stagger(5)
				}
			]
		];

		animate(seq, {
			repeat: Infinity,
			repeatType: 'reverse',
			repeatDelay: 1,
			// type: spring,
			stiffness: 300,
			onUpdate: (values: any) => {
				// console.log(values);
			},
			onanimationend: () => {
				console.log('end');
			},
			onanimationstart: () => {
				console.log('start');
			},
			onended: () => {
				console.log('ended');
			},
			onAnimationRepeat: () => {
				console.log('repeat');
			}
		});
	});
</script>

<div class="absolute top-0 left-0 h-screen w-screen overflow-hidden">
	<div id="logo" class="flex h-full w-full items-center justify-center">
		<!-- {@html logo} -->
		<video src={video} muted autoplay>
			<track kind="captions" />
		</video>
	</div>
</div>

<div class="absolute top-0 left-0 h-screen w-screen overflow-hidden">
	<div
		id="yellow"
		class="circle absolute top-1/2 left-1/2 h-[100px] w-[100px] rounded-full bg-[#fff200]"
	></div>
	<div class="circle absolute top-1/2 left-1/2 h-[100px] w-[100px] rounded-full bg-black"></div>
	<div class="series absolute top-0 left-0 flex h-screen w-screen items-center justify-center">
		<img class="serie absolute" src={s1} alt="Alaska" />
		<img class="serie absolute" src={s2} alt="Avatar" />
		<img class="serie absolute" src={s3} alt="Bob" />
	</div>
</div>
