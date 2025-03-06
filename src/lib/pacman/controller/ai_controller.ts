import type { PacmanBoard } from '../scene/board';

export class GhostController {
	private position: { x: number; y: number };
	private direction: { x: number; y: number };
	private velocity = { x: 0, y: 0 };
	private targetPosition = { x: 0, y: 0 };
	private lerpFactor = 0.1;
	speed: number = 5;
	private board: PacmanBoard;
	private movements: number = 200;

	constructor(startPosition: { x: number; y: number }, board: PacmanBoard, speed: number) {
		this.position = startPosition;
		this.direction = { x: 0, y: 0 };
		this.board = board;
		this.speed = speed;
	}

	private getPositionFromTile(tile: { x: number; y: number }): { x: number; y: number } {
		const tileSize = this.board.tileSize;
		return {
			x: tile.x * tileSize + tileSize / 2,
			y: tile.y * tileSize + tileSize / 2
		};
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
		const nextX = inTile.x + direction.x;
		const nextY = inTile.y + direction.y;
		return { x: nextX, y: nextY };
	}

	private canMoveInDirection(direction: { x: number; y: number }): boolean {
		const nextTile = this.getNextTileInDirection(direction);
		return this.board.isPath(nextTile.x, nextTile.y);
	}

	private getAvailableDirections(): { x: number; y: number }[] {
		const directions = [
			{ x: 0, y: -1 }, // up
			{ x: 0, y: 1 }, // down
			{ x: -1, y: 0 }, // left
			{ x: 1, y: 0 } // right
		];
		return directions.filter((direction) => {
			return this.canMoveInDirection(direction);
		});
	}

	private getRandomDirection(): { x: number; y: number } {
		const availableDirections = this.getAvailableDirections();
		const randomIndex = Math.floor(Math.random() * availableDirections.length);
		return availableDirections[randomIndex];
	}

	public move(delta: number): { x: number; y: number } {
		if (this.movements == 0) {
			return this.position;
		} else {
			if (Math.random() > 0.97) {
				this.direction = this.getRandomDirection();
			}
			if (this.position.x !== this.targetPosition.x || this.position.y !== this.targetPosition.y) {
				let newPosition = {
					x:
						this.position.x +
						(this.targetPosition.x - this.position.x) * this.lerpFactor +
						this.velocity.x * delta,
					y:
						this.position.y +
						(this.targetPosition.y - this.position.y) * this.lerpFactor +
						this.velocity.y * delta
				};
				this.movements--;
				return { x: newPosition.x, y: newPosition.y };
			}
			this.velocity.x = this.direction.x * this.speed;
			this.velocity.y = this.direction.y * this.speed;
			console.log('newDirection', this.direction);
			let newTile = this.getNextTileInDirection(this.direction);
			console.log('OnTile', this.getTileFromPosition(this.position));
			console.log('newTile', newTile);
			this.targetPosition = this.getPositionFromTile(newTile);
			let newPosition = {
				x:
					this.position.x +
					(this.targetPosition.x - this.position.x) * this.lerpFactor +
					this.velocity.x * delta,
				y:
					this.position.y +
					(this.targetPosition.y - this.position.y) * this.lerpFactor +
					this.velocity.y * delta
			};

			this.movements--;
			return { x: newPosition.x, y: newPosition.y };
		}
	}
}
