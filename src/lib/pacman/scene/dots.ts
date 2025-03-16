import * as PIXI from 'pixi.js';
import type { PacmanBoard } from './board';
import { Dot } from '../elements/dot';
import type { MrPacman } from '../elements/mr_pacman';
export class Dots {
	app: PIXI.Application;
	board: PacmanBoard;
	pacman: MrPacman;
	texture: string;
	dots: Dot[];
    eatDod: Function;
	constructor(app: PIXI.Application, board: PacmanBoard, texture: string, pacman: MrPacman, eatDot: Function) {
		this.app = app;
		this.board = board;
		this.dots = [];
		this.texture = texture;
		this.pacman = pacman;
        this.eatDod = eatDot;
	}
	async init() {
		const dotsPositions = this.board.dotsInitialPositions;
		for (let pos of dotsPositions) {
			const dotTexture = await PIXI.Assets.load(this.texture);
			const dot = new Dot(this.app, this.board, dotTexture, pos, this.pacman, () => {
				console.log('dot eaten');
				this.app.stage.removeChild(dot.sprite);
				this.dots = this.dots.filter((d) => d !== dot);
                this.eatDod();
			});
			this.dots.push(dot);
		}
	}

	update(delta: number, mrPackman: MrPacman) {
		for (let dot of this.dots) {
			dot.update(delta, mrPackman);
		}
	}
}
