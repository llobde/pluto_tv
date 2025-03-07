import * as PIXI from 'pixi.js';
import type { PacmanBoard, Tile } from './board';
import { Ghost } from '../elements/ghost';
import type { MrPacman } from '../elements/mr_pacman';
export class Ghosts {
	app: PIXI.Application;
	board: PacmanBoard;
	mrPackman: MrPacman;
	ghosts: Ghost[];
	numGhosts: number;
	texturesPaths: { [key: string]: string };
	constructor(
		app: PIXI.Application,
		board: PacmanBoard,
		mrPackman: MrPacman,
		numGhosts: number,
		texturesPaths: { [key: string]: string }
	) {
		this.app = app;
		this.board = board;
		this.mrPackman = mrPackman;
		this.numGhosts = numGhosts;
		this.ghosts = [];
		this.texturesPaths = texturesPaths;
	}
	async init() {
		// const ghostTexture = await PIXI.Assets.load(texturePath);
		let textureKeys: string[] = Object.keys(this.texturesPaths);
		textureKeys = textureKeys.sort(() => Math.random() - 0.5);
		let ghostsPositions = this.board.ghostsInitialPositions;
        console.log('ghostsPositions', ghostsPositions);
		for (let i = 0; i < this.numGhosts; i++) {
			const ghostTexture = await PIXI.Assets.load(this.texturesPaths[textureKeys[i]]);
			let ghostsInitialPosition = this.board.ghostsInitialPositions[i];

			const ghost: Ghost | null = new Ghost(
				this.app,
				ghostTexture,
				ghostsInitialPosition,
				this.board,
				this.mrPackman,
				5,
				() => {
					console.log('ghost eaten');
					this.ghostEaten(i);
				}
			);
			this.ghosts.push(ghost);
			this.app.stage.addChild(ghost.sprite);
		}
	}
	ghostEaten(index: number) {
		let ghost = this.ghosts[index];
		this.app.stage.removeChild(ghost.sprite);
		// this.ghosts[index] = null;
		// this.ghosts.splice(index, 1);
		console.log('ghost eaten');
	}

	update(delta: number) {
		this.ghosts.forEach((ghost) => ghost.update(delta));
	}
}
