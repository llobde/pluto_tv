import type { PacmanBoard } from '../scene/board';

export class MovementController {
	// Movement logic
	private x = 0;
	private y = 0;
	private velocity = { x: 0, y: 0 };
	private lerpFactor = 0.1;
	private speed = 5;
	private direction: { x: number; y: number } = { x: 0, y: 0 };
	private targetPosition = { x: 0, y: 0 };
	private board: PacmanBoard;

	constructor(startPosition: { x: number; y: number }, board: PacmanBoard) {
		this.x = startPosition.x;
		this.y = startPosition.y;
		this.targetPosition = startPosition;
		this.board = board;
		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	private onKeyDown(event: KeyboardEvent): void {
		let newDirection = { x: 0, y: 0 };
		if (event.key === 'ArrowUp') newDirection = { x: 0, y: -1 };
		if (event.key === 'ArrowDown') newDirection = { x: 0, y: 1 };
		if (event.key === 'ArrowLeft') newDirection = { x: -1, y: 0 };
		if (event.key === 'ArrowRight') newDirection = { x: 1, y: 0 };

		// console.log('TileSize', this.board.tileSize);
		let actualTile = this.positionToTile({ x: this.x, y: this.y });
		// console.log('actualTiles', actualTile);
		let nextTile = this.getNextTilePosition(newDirection);
		// console.log('nextTile', nextTile);
		// console.log('Actual Position', { x: this.x, y: this.y });
		let nextPosition = this.tileToPosition(nextTile);
		// console.log('nextPosition', nextPosition);

		if (this.canMove(newDirection)) {
			this.direction = newDirection;
			this.targetPosition.x = nextPosition.x - (this.board.tileSize / 2 * newDirection.x);
			this.targetPosition.y = nextPosition.y -(this.board.tileSize / 2 * newDirection.y);
			this.velocity.x = newDirection.x * this.speed;
			this.velocity.y = newDirection.y * this.speed;
		}
	}

	private canMove(newDirection: { x: number; y: number }): boolean {
		const nextTile = this.getNextTilePosition(newDirection);
		return this.board.isPath(nextTile.x, nextTile.y);
	}

	private getNextTilePosition(newDirection: { x: number; y: number }): { x: number; y: number } {
		const nextX = this.x + newDirection.x * this.board.tileSize;
		const nextY = this.y + newDirection.y * this.board.tileSize;

		const tileX = Math.floor(nextX / this.board.tileSize);
		const tileY = Math.floor(nextY / this.board.tileSize);

		return { x: tileX, y: tileY };
	}

	private positionToTile(position: { x: number; y: number }): { x: number; y: number } {
		const tileX = Math.floor(position.x / this.board.tileSize);
		const tileY = Math.floor(position.y / this.board.tileSize);
		return { x: tileX, y: tileY };
	}

	private tileToPosition(tile: { x: number; y: number }): { x: number; y: number } {
		const x = tile.x * this.board.tileSize;
		const y = tile.y * this.board.tileSize;
		return { x: x + this.board.tileSize / 2, y: y + this.board.tileSize / 2 };
	}

	move(delta: number): { x: number; y: number } {
		// this.x += (this.targetPosition.x - this.x) * this.lerpFactor + this.velocity.x * delta;
		// this.y += (this.targetPosition.y - this.y) * this.lerpFactor + this.velocity.y * delta;
		this.x += (this.targetPosition.x - this.x) * this.lerpFactor + this.velocity.x;
		this.y += (this.targetPosition.y - this.y) * this.lerpFactor + this.velocity.y;
		// this.x += (this.targetPosition.x - this.x) * this.lerpFactor + this.velocity.x;
		// this.y += (this.targetPosition.y - this.y) * this.lerpFactor + this.velocity.y;
		return { x: this.x, y: this.y };
	}
}
