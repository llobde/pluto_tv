enum Mode {
	CHASE,
	SCATTER,
	FRIGHTENED,
	EATEN
}

import type { MrPacman } from '../elements/mr_pacman';
import type { PacmanBoard, Tile } from '../scene/board';
import * as _ from 'lodash';
import { Chase, Escape } from './ai_alghorithms';

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
	}

	private moveAlongPath(delta: number) {
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

	update(delta: number, mrPacman: MrPacman) {
		if (this.intile === mrPacman.inTile) {
			console.log('Pacman and ghost are in the same tile');
            this.onEaten();
			this.mode = Mode.EATEN;
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
				this.moveAlongPath(delta);
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
				this.moveAlongPath(delta);
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
}
