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
	eatAGhotst: Function;
	constructor(
		app: PIXI.Application,
		board: PacmanBoard,
		mrPackman: MrPacman,
		numGhosts: number,
		texturesPaths: { [key: string]: string },
		eatAGhotst: Function
	) {
		this.app = app;
		this.board = board;
		this.mrPackman = mrPackman;
		this.numGhosts = numGhosts;
		this.ghosts = [];
		this.texturesPaths = texturesPaths;
		this.eatAGhotst = eatAGhotst;
	}
	async init() {
		// const ghostTexture = await PIXI.Assets.load(texturePath);
		let textureKeys: string[] = Object.keys(this.texturesPaths);
		textureKeys = textureKeys.sort(() => Math.random() - 0.5);
		let ghostsPositions = this.board.ghostsInitialPositions;
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
					this.ghostEaten(i);
				}
			);
			this.ghosts.push(ghost);
			this.app.stage.addChild(ghost.sprite);
		}
	}

	totalGhosts() {
		return this.ghosts.length;
	}

	ghostEaten(index: number) {
		if (this.ghosts[index].isKilled()) {
			return;
		}
		this.ghosts[index].kill();
		this.eatAGhotst();
	}

	ghostsKilled() {
		return this.ghosts.filter((g) => g.isKilled()).length;
	}

	update(delta: number) {
		// remove killed
		// this.ghosts = this.ghosts.filter((g) => g.isKilled() === false);
		// update
		for (const ghost of this.ghosts) {
			if (ghost.isKilled()) {
			} else {
				const otherGhosts = this.ghosts.filter(g => g !== ghost && !g.isKilled());
				ghost.update(delta, otherGhosts);
			}
		}
	}
}
