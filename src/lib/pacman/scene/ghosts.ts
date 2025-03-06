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
		for (let i = 0; i < this.numGhosts; i++) {
			const ghostTexture = await PIXI.Assets.load(this.texturesPaths[textureKeys[i]]);
			let ghostsInitialPosition = this.board.ghostsInitialPositions[i];
			ghostsInitialPosition.x = ghostsInitialPosition.x + this.board.tileSize / 2;
			ghostsInitialPosition.y = ghostsInitialPosition.y + this.board.tileSize / 2;
			const ghost = new Ghost(
				this.app,
				ghostTexture,
				ghostsInitialPosition,
				this.board,
				this.mrPackman,
				5
			);
			this.ghosts.push(ghost);
			this.app.stage.addChild(ghost.sprite);
		}
	}
	update(delta: number) {
		this.ghosts.forEach((ghost) => ghost.update(delta));
	}
}
