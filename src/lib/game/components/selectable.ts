import p5 from 'p5';
import { animate, type AnimationPlaybackControls } from 'motion';

export class Selectable {
	p5: p5;
	id: string;
	image: any;
	x: number;
	y: number;
	width: number;
	height: number;
	selected: boolean = false;
	animationDuration: number = 1; // seconds
	animationState: { height: number; width: number };
	animation: AnimationPlaybackControls | null = null;

	constructor(p5: p5, id: string, image: any, x: number, y: number, width: number, height: number) {
		this.p5 = p5;
		this.image = image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.id = id;
		this.animationState = {
			height: 0,
			width: 0
		};
	}

	animationFrame() {
		console.log('animationFrame');
	}

	setUp() {
		// this.p5.requestAnimationFrame(this.animationFrame.bind(this));
		// this.animation = animate(
		// 	this.animationState,
		// 	{
		// 		width: this.width,
		// 		height: this.height
		// 	},
		// 	{
		// 		autoplay: false,
		// 		duration: this.animationDuration,
		// 		ease: 'easeInOut'
		// 	}
		// );
	}

	// grow() {
	// 	let startTime = this.p5.millis();
	// 	// let duration = 15000;
	// 	let initialWidth = 0;
	// 	let initialHeight = 0;

	// 	const animate = () => {
	// 		let currentTime = this.p5.millis();
	// 		let elapsedTime = currentTime - startTime;
	// 		let progress = elapsedTime / this.duration;

	// 		if (progress < 1) {
	// 			let scale = this.p5.sin(progress * this.p5.PI);
	// 			this.width = initialWidth + (this.width - initialWidth) * scale;
	// 			this.height = initialHeight + (this.height - initialHeight) * scale;
	// 			this.p5.requestAnimationFrame(animate);
	// 		} else {
	// 			this.width = initialWidth + (this.width - initialWidth);
	// 			this.height = initialHeight + (this.height - initialHeight);
	// 		}
	// 	};

	// 	animate();
	// }

	animateUp() {
		this.animationState = {
			height: 0,
			width: 0
		};
		this.animation = animate(
			this.animationState,
			{
				width: this.width,
				height: this.height
			},
			{
				autoplay: false,
				duration: this.animationDuration,
				ease: 'easeInOut'
			}
		);
		this.animation?.play();
	}

	animateDown() {
		this.animation = animate(
			this.animationState,
			{
				width: 0,
				height: 0
			},
			{
				autoplay: false,
				duration: this.animationDuration,
				ease: 'easeInOut',
                repeat: 0,
			}
		);
		this.animation?.play();
	}

	draw() {
		this.p5.push();
		this.p5.image(
			this.image,
			this.x,
			this.y,
			//this.animationState.width,
			//this.animationState.height
			this.width,
			this.height
		);
		if (this.selected) {
			this.p5.fill(0, 0, 255, 100);
			this.p5.rect(this.x, this.y, this.width, this.height);//this.animationState.width, this.animationState.height);
		}
		this.p5.pop();
	}
}
