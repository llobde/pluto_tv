import { Directions, type Direction, type PacmanBoard, type Tile } from '../scene/board';

export class MovementController {
	// Movement logic
	private velocity = { x: 0, y: 0 };
	private lerpFactor = 0.1;
	private speed = 5;
	private prevDirection: Direction = { x: 0, y: 0 };
	private direction: Direction = { x: 0, y: 0 };
	private inTile!: Tile;
	private targetTile!: Tile;
	private position!: { x: number; y: number };
	private targetPosition!: { x: number; y: number };
	private board: PacmanBoard;

	constructor(board: PacmanBoard, startTile: Tile) {
		this.board = board;
		console.log('Pac man start tile', startTile);
		this.setInTile(startTile);
		this.setTargetTile(startTile);
		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	setInTile(tile: Tile) {
		this.inTile = tile;
		this.position = tile.getPositionInPixels();
	}

	setTargetTile(tile: Tile) {
		this.targetTile = tile;
		this.targetPosition = tile.getPositionInPixels();
	}

	getDirectionOnKeyDown(event: KeyboardEvent): Direction | null {
		if (event.key === 'ArrowUp') return { x: 0, y: -1 };
		if (event.key === 'ArrowDown') return { x: 0, y: 1 };
		if (event.key === 'ArrowLeft') return { x: -1, y: 0 };
		if (event.key === 'ArrowLeft') return { x: -1, y: 0 };
		if (event.key === 'ArrowRight') return { x: 1, y: 0 };
		return null;
	}

	private onKeyDown(event: KeyboardEvent): void {
		let newDirection = this.getDirectionOnKeyDown(event);
		if (newDirection === null) return;
		console.log('New direction', newDirection);
		if (this.canMove(this.inTile, newDirection) && newDirection !== this.prevDirection) {
			this.prevDirection = this.direction;
			this.direction = newDirection;
			this.targetTile = this.board.getLastTilePathInDirection(this.inTile, this.direction)!;
			console.log('Move to tile', this.targetTile);
			this.setTargetTile(this.targetTile);
			this.velocity.x = newDirection.x * this.speed;
			this.velocity.y = newDirection.y * this.speed;
		}
	}

	private canMove(inTile: Tile, toDirection: Direction): boolean {
		// let nextTile: Tile | null = this.board.getAdjacentTileInDirection(inTile, toDirection);
		// if (!nextTile) return false;
		// if (nextTile.isWall()) {
		// 	let nextTilePosition = nextTile.getPositionInPixels();
		// 	console.log('Direction', this.direction);
		// 	console.log('Next tile position', nextTilePosition);
		// 	console.log('Current position', this.position);
		// 	if (this.direction.y == -1) {
		// 		console.log('UP');
		// 		if (this.position.y > nextTilePosition.y) {
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// 	if (this.direction.y == 1) {
		// 		console.log('DOWN');
		// 		if (this.position.y < nextTilePosition.y) {
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// 	if (this.direction.x == -1) {
		// 		console.log('LEFT');
		// 		if (this.position.x > nextTilePosition.x) {
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// 	if (this.direction.x == 1) {
		// 		console.log('RIGHT');
		// 		if (this.position.x < nextTilePosition.x) {
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// 	return false;
		// }
		// return true;
	}

	move(delta: number): { x: number; y: number } {
		let inTile = this.board.getTileFromPixel(this.position);
		if (!inTile) {
			return { x: this.position.x, y: this.position.y };
		}
		let nextTile = this.board.getAdjacentTileInDirection(inTile, this.direction);
		if (nextTile && this.canMove(nextTile, this.direction)) {
			// this.setInTile(nextTile);
			this.position.x += this.speed * delta * this.direction.x;
			this.position.y += this.speed * delta * this.direction.y;
		}
		return { x: this.position.x, y: this.position.y };
	}
}
