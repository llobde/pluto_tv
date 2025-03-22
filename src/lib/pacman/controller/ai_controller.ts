enum Mode {
	CHASE,
	SCATTER,
	FRIGHTENED,
	CLEVER,
	EATEN,
	KILLED,
	CRAZY
}

import type { MrPacman } from '../elements/mr_pacman';
import type { PacmanBoard, Tile } from '../scene/board';
import * as _ from 'lodash';
import { Chase, Escape } from './ai_alghorithms';
import type { Ghost } from '../elements/ghost';

export class GhostController {
	intile: Tile;
	position: { x: number; y: number };
	private direction: { x: number; y: number };
	private velocity = { x: 0, y: 0 };
	private targetTile: Tile;
	private lerpFactor = 0.2;
	speed: number = 5;
	private board: PacmanBoard;
	private isScared: boolean = false;
	private inPAth: Tile[] = [];
	private furtherTile?: Tile;
	private chase: Chase;
	private escape: Escape;
	private mode: Mode = Mode.FRIGHTENED;
	onEaten: Function;

	constructor(startPosition: Tile, board: PacmanBoard, speed: number, onEaten: Function) {
		this.onEaten = onEaten;
		this.intile = startPosition;
		this.position = startPosition.getPositionInPixels();
		this.targetTile = startPosition;
		this.direction = { x: 0, y: 0 };
		this.board = board;
		this.speed = speed;
		this.chase = new Chase(board);
		this.escape = new Escape(board);
		// this.startCrazyMode();
	}

	/*** CRAZY MODE */

	// private crazyInterval!: NodeJS.Timeout;
	// private crazyTimeout!: NodeJS.Timeout;

	// startCrazyMode() {
	// 	this.crazyInterval = setInterval(() => {
	// 		this.mode = Mode.CRAZY;
	// 		this.crazyTimeout = setTimeout(() => {
	// 			this.mode = Mode.CLEVER;
	// 		}, 3000);
	// 	}, 5000);
	// }

	// stopCrazyMode() {
	// 	clearInterval(this.crazyInterval);
	// 	clearTimeout(this.crazyTimeout);
	// }

	get inFurtherTile() {
		return this.furtherTile;
	}

	set inFurtherTile(tile: Tile | undefined) {
		this.furtherTile = tile;
	}

	private moveAlongPath(delta: number, otherGhosts: Ghost[]) {
		if (this.inPAth.length > 0) {
			const nextTile = this.inPAth[0];
			const nextPosition = nextTile.getPositionInPixels();

			this.position.x += (nextPosition.x - this.position.x) * this.lerpFactor * delta;
			this.position.y += (nextPosition.y - this.position.y) * this.lerpFactor * delta;

			if (
				Math.abs(this.position.x - nextPosition.x) < 1 &&
				Math.abs(this.position.y - nextPosition.y) < 1
			) {
				this.position = nextPosition;
				this.intile = nextTile;
				this.inPAth.shift();
			}
		}
		return this.position;
	}

	update(delta: number, mrPacman: MrPacman, otherGhosts: Ghost[]) {
		if (this.mode === Mode.KILLED) {
			return;
		}
		if (this.intile === mrPacman.inTile) {
			this.onEaten();
			this.mode = Mode.KILLED;
			return this.position;
		}

		switch (this.mode) {
			case Mode.CHASE:
				if (this.inPAth.length === 0) {
					this.inPAth = this.chase.findPathToPacman(mrPacman, this.intile);
				} else {
					if (Math.random() < delta / 1000) {
						this.inPAth = this.chase.findPathToPacman(mrPacman, this.intile);
					}
				}
				this.moveAlongPath(delta, otherGhosts);
				return this.position;
				break;
			case Mode.SCATTER:
				return this.position;
				break;
			case Mode.FRIGHTENED:
				if (this.inPAth.length === 0) {
					this.inPAth = this.escape.findPathAwayFromPacman(mrPacman, this.intile);
				} else {
					if (Math.random() < delta / 1000) {
						this.inPAth = this.escape.findPathAwayFromPacman(mrPacman, this.intile);
					}
				}
				this.moveAlongPath(delta, otherGhosts);
				return this.position;
				break;
			case Mode.CLEVER:
				let otherPaths = otherGhosts.map((g) => {
					return g.aiController.inPAth;
				});
				let otherGhostsTiles = otherGhosts.map((g) => {
					return g.aiController.intile;
				});
				if (this.inPAth.length === 0) {
					
				} else {
					
				}
				this.moveAlongPath(delta, otherGhosts);
				return this.position;
				break;
			case Mode.CRAZY:
				const otherPaths2 = otherGhosts.map((g) => {
					return g.aiController.inPAth;
				});
				const otherGhostsTiles2 = otherGhosts.map((g) => {
					return g.aiController.intile;
				});
				if (this.inPAth.length === 0) {
					this.inPAth = this.escape.findRandomPathAwayFromPacman(mrPacman, this.intile);
				} else {
					if (Math.random() < delta / 1000) {
						this.inPAth = this.escape.findRandomPathAwayFromPacman(mrPacman, this.intile);
					}
				}
				this.moveAlongPath(delta, otherGhosts);
				return this.position;
				break;
			case Mode.EATEN:
				return this.position;
				break;
			default:
				return this.position;
				break;
		}
	}

	isKilled() {
		return this.mode === Mode.KILLED;
	}

	kill() {
		this.mode = Mode.KILLED;
	}
}
