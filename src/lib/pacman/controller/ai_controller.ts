// import type { PacmanBoard } from '../scene/board';

// export class GhostController {
// 	private position: { x: number; y: number };
// 	private direction: { x: number; y: number };
// 	private velocity = { x: 0, y: 0 };
// 	private targetPosition = { x: 0, y: 0 };
// 	private lerpFactor = 0.2;
// 	speed: number = 5;
// 	private board: PacmanBoard;
// 	// private movements: number = 10;

// 	constructor(startPosition: { x: number; y: number }, board: PacmanBoard, speed: number) {
// 		this.position = startPosition;
// 		this.targetPosition = startPosition;
// 		this.direction = { x: 0, y: 0 };
// 		this.board = board;
// 		this.speed = speed;
// 		// setInterval(this.nextMove.bind(this), 500);
// 	}

// 	private getPositionFromTile(tile: { x: number; y: number }): { x: number; y: number } {
// 		const tileSize = this.board.tileSize;
// 		return {
// 			x: tile.x * tileSize + tileSize / 2,
// 			y: tile.y * tileSize + tileSize / 2
// 		};
// 	}

// 	private getTileFromPosition(position: { x: number; y: number }): { x: number; y: number } {
// 		const tileSize = this.board.tileSize;
// 		return {
// 			x: Math.floor(position.x / tileSize),
// 			y: Math.floor(position.y / tileSize)
// 		};
// 	}

// 	private getNextTileInDirection(direction: { x: number; y: number }): { x: number; y: number } {
// 		const inTile = this.getTileFromPosition(this.position);
// 		const nextX = inTile.x + direction.x;
// 		const nextY = inTile.y + direction.y;
// 		return { x: nextX, y: nextY };
// 	}

// 	private canMoveInDirection(direction: { x: number; y: number }): boolean {
// 		const nextTile = this.getNextTileInDirection(direction);
// 		return this.board.isPath(nextTile.x, nextTile.y);
// 	}

// 	private getAvailableDirections(): { x: number; y: number }[] {
// 		const directions = [
// 			{ x: 0, y: -1 }, // up
// 			{ x: 0, y: 1 }, // down
// 			{ x: -1, y: 0 }, // left
// 			{ x: 1, y: 0 } // right
// 		];
// 		return directions.filter((direction) => {
// 			return this.canMoveInDirection(direction);
// 		});
// 	}

// 	private getRandomAvaibleDirection(): { x: number; y: number } | null {
// 		const availableDirections = this.getAvailableDirections();
// 		if (availableDirections.length === 0) {
// 			return null;
// 		}
// 		const randomIndex = Math.floor(Math.random() * availableDirections.length);
// 		return availableDirections[randomIndex];
// 	}

// 	public nextMove() {
// 		let randomDir = this.getRandomAvaibleDirection();
// 		if (randomDir) {
// 			this.direction = randomDir;
// 			const nextTile = this.getNextTileInDirection(this.direction);
// 			this.targetPosition = this.getPositionFromTile(nextTile);
// 		}
// 	}

// 	private goalPosition() {
// 		let floorPosition: { x: number; y: number } = {
// 			x: Math.round(this.position.x),
// 			y: Math.round(this.position.y)
// 		};
// 		let floorTargetPosition: { x: number; y: number } = {
// 			x: Math.round(this.targetPosition.x),
// 			y: Math.round(this.targetPosition.y)
// 		};
// 		if (floorPosition.x === floorTargetPosition.x && floorPosition.y === floorTargetPosition.y) {
// 			return true;
// 		}
// 		return false;
// 	}

// 	private UpdatePosition(delta: number) {
// 		this.position.x += (this.targetPosition.x - this.position.x) * this.lerpFactor * delta;
// 		this.position.y += (this.targetPosition.y - this.position.y) * this.lerpFactor * delta;
// 		// this.position.x += (this.targetPosition.x - this.position.x) * delta;
// 		// this.position.y += (this.targetPosition.y - this.position.y) * delta;
// 	}

// 	update(delta: number) {
// 		if (this.goalPosition()) {
// 			this.nextMove();
// 			this.UpdatePosition(delta);
// 			return this.position;
// 		} else {
// 			this.UpdatePosition(delta);
// 			// console.log(this.position, this.targetPosition);
// 			return this.position;
// 		}
// 	}
// }

// import type { PacmanBoard } from '../scene/board';

// export class GhostController {
// 	position: { x: number; y: number };
// 	private direction: { x: number; y: number };
// 	private velocity = { x: 0, y: 0 };
// 	private targetPosition = { x: 0, y: 0 };
// 	private lerpFactor = 0.2;
// 	speed: number = 5;
// 	private board: PacmanBoard;

// 	constructor(startPosition: { x: number; y: number }, board: PacmanBoard, speed: number) {
// 		this.position = startPosition;
// 		this.targetPosition = startPosition;
// 		this.direction = { x: 0, y: 0 };
// 		this.board = board;
// 		this.speed = speed;
// 	}

// 	private getPositionFromTile(tile: { x: number; y: number }): { x: number; y: number } {
// 		const tileSize = this.board.tileSize;
// 		return {
// 			x: tile.x * tileSize + tileSize / 2,
// 			y: tile.y * tileSize + tileSize / 2
// 		};
// 	}

// 	private getTileFromPosition(position: { x: number; y: number }): { x: number; y: number } {
// 		const tileSize = this.board.tileSize;
// 		return {
// 			x: Math.floor(position.x / tileSize),
// 			y: Math.floor(position.y / tileSize)
// 		};
// 	}

// 	private getNextTileInDirection(direction: { x: number; y: number }): { x: number; y: number } {
// 		const inTile = this.getTileFromPosition(this.position);
// 		return { x: inTile.x + direction.x, y: inTile.y + direction.y };
// 	}

// 	private canMoveInDirection(direction: { x: number; y: number }): boolean {
// 		const nextTile = this.getNextTileInDirection(direction);
// 		return this.board.isPath(nextTile.x, nextTile.y);
// 	}

// 	private getAvailableDirections(): { x: number; y: number }[] {
// 		const directions = [
// 			{ x: 0, y: -1 },
// 			{ x: 0, y: 1 },
// 			{ x: -1, y: 0 },
// 			{ x: 1, y: 0 }
// 		];
// 		return directions.filter((dir) => this.canMoveInDirection(dir));
// 	}

// 	private getBestDirection(target: { x: number; y: number }): { x: number; y: number } {
// 		const availableDirections = this.getAvailableDirections();
// 		if (availableDirections.length === 0) return { x: 0, y: 0 };

// 		return availableDirections.reduce((best, dir) => {
//             console.log('best', best);
//             console.log('dir', dir);
// 			const nextTile = this.getNextTileInDirection(dir);
// 			const bestTile = this.getNextTileInDirection(best);
// 			const nextDist = Math.hypot(nextTile.x - target.x, nextTile.y - target.y);
// 			const bestDist = Math.hypot(bestTile.x - target.x, bestTile.y - target.y);
// 			return nextDist < bestDist ? dir : best;
// 		}, availableDirections[0]);
// 	}

// 	public nextMove(target: { x: number; y: number }) {
// 		this.direction = this.getBestDirection(target);
// 		this.targetPosition = this.getPositionFromTile(this.getNextTileInDirection(this.direction));
// 	}

// 	private goalPosition(): boolean {
// 		return (
// 			Math.round(this.position.x) === Math.round(this.targetPosition.x) &&
// 			Math.round(this.position.y) === Math.round(this.targetPosition.y)
// 		);
// 	}

// 	private UpdatePosition(delta: number) {
// 		this.position.x += (this.targetPosition.x - this.position.x) * this.lerpFactor * delta;
// 		this.position.y += (this.targetPosition.y - this.position.y) * this.lerpFactor * delta;
// 	}

// 	update(delta: number, pacmanPosition: { x: number; y: number }) {
// 		if (this.goalPosition()) {
// 			this.nextMove(pacmanPosition);
// 		}
// 		this.UpdatePosition(delta);
// 	}
// }

import type { MrPacman } from '../elements/mr_pacman';
import type { PacmanBoard, Tile } from '../scene/board';
import * as _ from 'lodash';

export class GhostController {
	position: Tile;
	private direction: { x: number; y: number };
	private velocity = { x: 0, y: 0 };
	private targetPosition: Tile;
	private lerpFactor = 0.2;
	speed: number = 5;
	private board: PacmanBoard;
	private isScared: boolean = false;

	constructor(startPosition: Tile, board: PacmanBoard, speed: number) {
		this.position = startPosition;
		this.targetPosition = startPosition;
		this.direction = { x: 0, y: 0 };
		this.board = board;
		this.speed = speed;
	}

	private getTileFromPosition(position: { x: number; y: number }): { x: number; y: number } {
		const tileSize = this.board.tileSize;
		return {
			x: Math.floor(position.x / tileSize),
			y: Math.floor(position.y / tileSize)
		};
	}

	private getNextTileInDirection(direction: { x: number; y: number }): { x: number; y: number } {
		const inTile = this.getTileFromPosition(this.position);
		return { x: inTile.x + direction.x, y: inTile.y + direction.y };
	}

	private canMoveInDirection(direction: { x: number; y: number }): boolean {
		const nextTile = this.getNextTileInDirection(direction);
		return this.board.isPath(nextTile.x, nextTile.y);
	}

	private getAvailableDirections(): { x: number; y: number }[] {
		const directions = [
			{ x: 0, y: -1 },
			{ x: 0, y: 1 },
			{ x: -1, y: 0 },
			{ x: 1, y: 0 }
		];
		return directions.filter((dir) => this.canMoveInDirection(dir));
	}

	private getBestDirection(
		target: { x: number; y: number },
		escape: boolean = false
	): { x: number; y: number } {
		const availableDirections = this.getAvailableDirections();
		if (availableDirections.length === 0) return { x: 0, y: 0 };

		return availableDirections.reduce((best, dir) => {
			const nextTile = this.getNextTileInDirection(dir);
			const bestTile = this.getNextTileInDirection(best);
			const nextDist = Math.hypot(nextTile.x - target.x, nextTile.y - target.y);
			const bestDist = Math.hypot(bestTile.x - target.x, bestTile.y - target.y);

			return escape ? (nextDist > bestDist ? dir : best) : nextDist < bestDist ? dir : best;
		}, availableDirections[0]);
	}

	public setScaredMode(scared: boolean) {
		this.isScared = scared;
	}

	public nextMove(target: { x: number; y: number }) {
		this.direction = this.getBestDirection(target, this.isScared);
		this.targetPosition = this.getPositionFromTile(this.getNextTileInDirection(this.direction));
	}

	private goalPosition(): boolean {
		return (
			Math.round(this.position.x) === Math.round(this.targetPosition.x) &&
			Math.round(this.position.y) === Math.round(this.targetPosition.y)
		);
	}

	private UpdatePosition(delta: number) {
		this.position.x += (this.targetPosition.x - this.position.x) * this.lerpFactor * delta;
		this.position.y += (this.targetPosition.y - this.position.y) * this.lerpFactor * delta;
	}

	update(delta: number, mrPacman: MrPacman) {
		if (this.goalPosition()) {
			this.nextMove(mrPacman.position);
		}
		this.UpdatePosition(delta);
	}
}
