import * as PIXI from 'pixi.js';
import { MrPacman } from './elements/mr_pacman';
import { Ghost } from './elements/ghost';
import { PacmanBoard } from './scene/board';
import { Dot } from './elements/dot';
import { Ghosts } from './scene/ghosts';
import { Dots } from './scene/dots';
export class PacMan {
	appendTo: HTMLElement;
	canvasSizeH: number;
	canvasSizeW: number;
	assets: {
		[key: string]: string;
	};
	series: {
		[key: string]: string;
	};
	app: PIXI.Application;
	numGhosts: number;
	tileSize: number = 100;
	eatDot: Function;
	eatSerie: Function;
	onEnd: Function;
	gameSeconds: number = 60;
	secondsToEnd: number;
	interval: any;

	constructor(
		appendTo: HTMLElement,
		canvasSizeW: number,
		canvasSizeH: number,
		tileSize: number,
		assets: { [key: string]: string },
		series: { [key: string]: string },
		eatDot: Function,
		eatSerie: Function,
		onEnd: Function
	) {
		this.canvasSizeW = canvasSizeW;
		this.canvasSizeH = canvasSizeH;
		this.tileSize = tileSize;
		this.assets = assets;
		this.series = series;
		this.appendTo = appendTo;
		this.app = new PIXI.Application();
		this.eatDot = eatDot;
		this.eatSerie = eatSerie;
		this.onEnd = onEnd;
		// this.numGhosts = Object.keys(this.series).length;
		this.numGhosts = 5;
		this.secondsToEnd = this.gameSeconds;
	}

	async init() {
		console.log('PacMan init');
		await this.app.init({
			width: this.canvasSizeW,
			height: this.canvasSizeH,
			backgroundColor: 0x000000
		});
		this.appendTo.appendChild(this.app.canvas);

		// Crear Laberinto (paredes)
		const board = new PacmanBoard(
			this.app,
			this.canvasSizeW,
			this.canvasSizeH,
			this.numGhosts,
			this.tileSize
		);

		// Crear Pac-Man
		let pacmanTExture = await PIXI.Assets.load(this.assets['pacman']);
		const pacman = new MrPacman(this.app, pacmanTExture, board);

		// Crear Fantasmas
		const ghosts = new Ghosts(this.app, board, pacman, this.numGhosts, this.series, () => {
			this.numGhosts--;
			this.eatSerie();
		});
		await ghosts.init();

		// Crear puntos
		const dots = new Dots(this.app, board, this.assets['dot'], pacman, this.eatDot);
		dots.init();

		// Execute countdown
		this.interval = setInterval(this.countdown.bind(this), 1000);

		// Movimiento y colisión
		const gameLoop = (time: any) => {
			// console.log('Num ghosts', this.numGhosts);
			if (this.numGhosts === 0) {
				console.log('Game Over');
				this.endGame();
			}
			pacman.update(time.deltaTime);
			ghosts.update(time.deltaTime);
			dots.update(time.deltaTime, pacman);
		};

		this.app.ticker.add(gameLoop.bind(this));
	}

	countdown() {
		this.secondsToEnd--;
		console.log(`Time left: ${this.secondsToEnd} seconds`);
		if (this.secondsToEnd <= 0) {
			console.log('Time is up!');
			this.endGame();
		}
	}

	endGame() {
		this.app.ticker.stop();
		this.interval = clearInterval(this.interval);
		this.onEnd();
	}
}
