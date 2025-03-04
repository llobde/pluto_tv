import * as PIXI from 'pixi.js';
import type { PacmanBoard } from './board';
import { Ghost } from '../elements/ghost';
export class Ghosts {
	app: PIXI.Application;
	board: PacmanBoard;
	ghosts: Ghost[];
	numGhosts: number;
	texturesPaths: { [key: string]: string };
	constructor(
		app: PIXI.Application,
		board: PacmanBoard,
		numGhosts: number,
		texturesPaths: { [key: string]: string }
	) {
		this.app = app;
		this.board = board;
		this.numGhosts = numGhosts;
		this.ghosts = [];
		this.texturesPaths = texturesPaths;
	}
	async init() {
		// const ghostTexture = await PIXI.Assets.load(texturePath);
		let textureKeys: string[] = Object.keys(this.texturesPaths);
        textureKeys = textureKeys.sort(() => Math.random() - 0.5);
		let ghostsPositions = this.board.ghostsInitialPositions;
		for (let i = 0; i < this.numGhosts; i++) {
            const ghostTexture = await PIXI.Assets.load(this.texturesPaths[textureKeys[i]]);
			const ghost = new Ghost(
				this.app,
				ghostTexture,
				ghostsPositions[i].x,
				ghostsPositions[i].y,
				1
			);
			this.ghosts.push(ghost);
			this.app.stage.addChild(ghost.sprite);
		}
	}
	update(delta: number) {
		this.ghosts.forEach((ghost) => ghost.update(delta));
	}
}
