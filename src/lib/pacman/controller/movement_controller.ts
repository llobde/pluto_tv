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
	private bufferChangePosition = false;

	constructor(board: PacmanBoard, startTile: Tile) {
		this.board = board;
		console.log('Pac man start tile', startTile);
		this.setInTile(startTile);
		this.setTargetTile(startTile);
		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	setInTile(tile: Tile, setPosition: boolean = true) {
		this.inTile = tile;
		if (!setPosition) return;
		this.position = tile.getPositionInPixels();
	}

	setTargetTile(tile: Tile) {
		this.targetTile = tile;
		this.targetPosition = tile.getPositionInPixels();
	}

	get previousVelocity() {
		return { x: this.prevDirection.x * this.speed, y: this.prevDirection.y * this.speed };
	}

	getDirectionOnKeyDown(event: KeyboardEvent): Direction | null {
		if (event.key === 'ArrowUp') return { x: 0, y: -1 };
		if (event.key === 'ArrowDown') return { x: 0, y: 1 };
		if (event.key === 'ArrowLeft') return { x: -1, y: 0 };
		if (event.key === 'ArrowRight') return { x: 1, y: 0 };
		return null;
	}

	sameDirection(direction: Direction): boolean {
		return direction.x === this.direction.x && direction.y === this.direction.y;
	}

	private onKeyDown(event: KeyboardEvent): void {
		let newDirection = this.getDirectionOnKeyDown(event);
		if (newDirection === null) return;
		if (this.canMove(this.inTile, newDirection) && !this.sameDirection(newDirection)) {
			this.bufferChangePosition = true;
			this.prevDirection = this.direction;
			this.direction = newDirection;
			this.targetTile = this.board.getLastTilePathInDirection(this.inTile, this.direction)!;
			this.setTargetTile(this.targetTile);
			this.velocity.x = newDirection.x * this.speed;
			this.velocity.y = newDirection.y * this.speed;
			console.log('Velocity', this.velocity);
			console.log('Precious velocity', this.previousVelocity);
		}
	}

	private isInMiddleOfTile(): boolean {
		if (this.direction.x == 1) {
			if (this.position.x > this.inTile.getPositionInPixels().x) {
				return true;
			}
		} else if (this.direction.x == -1) {
			if (this.position.x < this.inTile.getPositionInPixels().x) {
				return true;
			}
		}
		if (this.direction.y == 1) {
			if (this.position.y > this.inTile.getPositionInPixels().y) {
				return true;
			}
		} else if (this.direction.y == -1) {
			if (this.position.y < this.inTile.getPositionInPixels().y) {
				return true;
			}
		}
		return false;
	}

	private canMove(inTile: Tile, toDirection: Direction): boolean {
		let nextTile: Tile | null = this.board.getAdjacentTileInDirection(inTile, toDirection);
		if (!nextTile) return false;
		if (nextTile.isWall() && this.isInMiddleOfTile()) {
			return false;
		}
		return true;
	}

	private get inBuffer() {
		return (
			this.bufferChangePosition && (this.previousVelocity.x !== 0 || this.previousVelocity.y !== 0)
		);
	}

	move(delta: number): { x: number; y: number } {
		let inTile = this.board.getTileFromPixel(this.position);
		if (inTile) {
			this.setInTile(inTile, false);
			if (this.canMove(this.inTile, this.direction)) {
				// if (this.inBuffer) {
				// 	console.log('In buffer');
				// 	if (!this.isInMiddleOfTile()) {
				//         console.log('Previous velocity', this.previousVelocity);
				// 		this.position.x += this.previousVelocity.x * delta;
				// 		this.position.y += this.previousVelocity.y * delta;
				// 	} else {
				// 		this.bufferChangePosition = false;
				// 		this.position.x += this.velocity.x * delta;
				// 		this.position.y += this.velocity.y * delta;
				// 	}
				// } else {
				// 	this.position.x += this.velocity.x * delta;
				// 	this.position.y += this.velocity.y * delta;
				// }
				this.position.x += this.velocity.x * delta;
				this.position.y += this.velocity.y * delta;
			}
		}
		return { x: this.position.x, y: this.position.y };
	}
}
