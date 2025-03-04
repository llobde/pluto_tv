import p5 from 'p5';
// import * as ml5 from 'ml5';
import { AiBody } from './components/ia';
import { HandsPointer } from './components/hands_pointer';
import { Grid } from './components/grid';
import { Board } from './components/board';

export class GameSketch {
	p5: any;
	debug: boolean = false;
	loaded: boolean = false;
	aiBody!: AiBody;
	handsPointer!: HandsPointer;
	board!: Board;
	onLoad: Function = () => {};
	hand_l: any;
	hand_r: any;
	pnjs: any[] = [];

	constructor(onLoad: Function, hand_l: any, hand_r: any, pnjs: any, debug: boolean) {
		this.hand_l = hand_l;
		this.hand_r = hand_r;
		this.pnjs = pnjs;
		this.debug = debug;
		this.onLoad = onLoad;
		this.p5 = new p5(this.sketch.bind(this));
	}
	sketch(p: p5) {
		this.p5 = p;
		this.aiBody = new AiBody(this.p5, this.onLoad, this.debug);
		this.handsPointer = new HandsPointer(this.p5, this.aiBody, this.hand_l, this.hand_r);
		this.board = new Board(this.p5, this.aiBody, this.pnjs);

		p.preload = () => {
			console.log('preload');
			this.handsPointer.preload();
			this.board.preload();
		};

		p.setup = async () => {
			console.log('setup');
			console.log(this.handsPointer);
			await this.setUp();
		};
		p.draw = () => {
			this.draw();
		};

		p.windowResized = () => {
			this.windowResized();
		};

		p.keyPressed = () => {
			this.keyPressed(p.key);
		};
	}

	keyPressed(key: string) {
		this.aiBody.keyPressed(key);
	}

	async setUp() {
		this.p5.createCanvas(this.p5.windowWidth, this.p5.windowHeight);
		this.p5.angleMode(this.p5.DEGREES);
		this.p5.background(0);
		this.board.setUp();
		await this.aiBody.setUp();
		this.loaded = true;
		this.onLoad();
	}

	draw() {
		this.p5.background(0);
		if (this.loaded) {
			if (this.debug) {
				this.aiBody.drawAll(this.debug);
			}
			this.board.draw();
			this.handsPointer.draw();
		}
	}

	windowResized() {
		this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
		// this.grid.windowResized();
	}
}
