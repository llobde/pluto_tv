import * as PIXI from 'pixi.js';
import { MrPacman } from './elements/mr_pacman';
import { Ghost } from './elements/ghost';
import { PacmanBoard } from './scene/board';
import { Dot } from './elements/dot';
import { Ghosts } from './scene/ghosts';
import { Dots } from './scene/dots';
export class PacMan {
	appendTo: HTMLElement;
	assets: {
		[key: string]: string;
	};
	series: {
		[key: string]: string;
	};
	app: PIXI.Application;
	numGhosts: number = 1;
	constructor(
		appendTo: HTMLElement,
		assets: { [key: string]: string },
		series: { [key: string]: string }
	) {
		this.assets = assets;
		this.series = series;
		this.appendTo = appendTo;
		this.app = new PIXI.Application();
	}
	async init() {
		console.log('PacMan init');
		await this.app.init({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000
		});
		this.appendTo.appendChild(this.app.canvas);

		// Crear Laberinto (paredes)
		const board = new PacmanBoard(this.app, window.innerWidth, window.innerHeight);

		// Crear puntos
		// const dots = new Dots(this.app, board);
		// dots.init();

		// Crear Pac-Man
		let pacmanTExture = await PIXI.Assets.load(this.assets['pacman']);
		const pacman = new MrPacman(this.app, pacmanTExture, board);

		// Crear Fantasmas
		const ghosts = new Ghosts(this.app, board, pacman, this.numGhosts, this.series);
		await ghosts.init();

		// Movimiento y colisión
		const gameLoop = (time: any) => {
			pacman.update(time.deltaTime);
			ghosts.update(time.deltaTime);
		};

		this.app.ticker.add(gameLoop.bind(this));
	}
}
