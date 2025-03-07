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

	stop() {
		this.velocity = { x: 0, y: 0 };
		this.prevDirection = { x: 0, y: 0 };
		this.direction = { x: 0, y: 0 };
	}

	isStopped() {
		return this.velocity.x === 0 && this.velocity.y === 0;
	}

	notInDirection() {
		return this.direction.x === 0 && this.direction.y === 0;
	}

	areOppositeDirections(direction1: Direction, direction2: Direction): boolean {
		return direction1.x === -direction2.x && direction1.y === -direction2.y;
	}

	formRightAngle(direction1: Direction, direction2: Direction): boolean {
		if (direction1.x === 0 && direction2.x === 0) return false;
		if (direction1.y === 0 && direction2.y === 0) return false;
		return (
			(direction1.x === 0 &&
				Math.abs(direction1.y) === 1 &&
				Math.abs(direction2.x) === 1 &&
				direction2.y === 0) ||
			(direction1.y === 0 &&
				Math.abs(direction1.x) === 1 &&
				Math.abs(direction2.y) === 1 &&
				direction2.x === 0)
		);
	}

	private onKeyDown(event: KeyboardEvent): void {
		let newDirection = this.getDirectionOnKeyDown(event);
		if (newDirection === null) return;
		// console.log('New direction', newDirection);
		// console.log('Same direction', this.sameDirection(newDirection));
		if (this.canChangeDirection(this.inTile, newDirection) && !this.sameDirection(newDirection)) {
			if (this.formRightAngle(newDirection, this.direction)) {
				this.activateBuffer();
			}
			this.prevDirection = this.direction;
			this.direction = newDirection;
			this.targetTile = this.board.getLastTilePathInDirection(this.inTile, this.direction)!;
			this.setTargetTile(this.targetTile);
			this.velocity.x = newDirection.x * this.speed;
			this.velocity.y = newDirection.y * this.speed;
			// console.log('Velocity', this.velocity);
			// console.log('Precious velocity', this.previousVelocity);
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

	private canChangeDirection(inTile: Tile, toDirection: Direction): boolean {
		let nextTile: Tile | null = this.board.getAdjacentTileInDirection(inTile, toDirection);
		if (!nextTile) return false;
		if (nextTile.isWall()) return false;
		if (this.formRightAngle(toDirection, this.direction)) {
			if (!this.inTile.isPointInsideActionSquare(this.position)) return false;
		}
		return true;
	}

	private canMove(inTile: Tile, toDirection: Direction): boolean {
		let nextTile: Tile | null = this.board.getAdjacentTileInDirection(inTile, toDirection);
		if (!nextTile) return false;
		if (nextTile.isWall() && this.isInMiddleOfTile()) return false;
		return true;
	}

	private get inBuffer() {
		return (
			this.bufferChangePosition && (this.previousVelocity.x !== 0 || this.previousVelocity.y !== 0)
		);
	}

	private activateBuffer() {
		this.bufferChangePosition = true;
	}

	private desactivateBuffer() {
		this.bufferChangePosition = false;
	}

	private getPositionRelativeToTile(): { x: number; y: number } {
		const tilePosition = this.inTile.getPositionInPixels();
		return {
			x: this.position.x - tilePosition.x,
			y: this.position.y - tilePosition.y
		};
	}

	private inDistanceToChangeDirection(limit: number = 1): boolean {
		const positionRelativeToTile = this.getPositionRelativeToTile();
		const distance = Math.sqrt(
			Math.pow(positionRelativeToTile.x, 2) + Math.pow(positionRelativeToTile.y, 2)
		);
		if (distance < limit) {
		} else {
		}
		return distance < 1;
	}

	private isPastTilePosition(): boolean {
		const tilePosition = this.inTile.getPositionInPixels();
		if (this.direction.x === 1 && this.position.x > tilePosition.x) return true;
		if (this.direction.x === -1 && this.position.x < tilePosition.x) return true;
		if (this.direction.y === 1 && this.position.y > tilePosition.y) return true;
		if (this.direction.y === -1 && this.position.y < tilePosition.y) return true;
		return false;
	}

	private isPrevTilePosition(): boolean {
		const tilePosition = this.inTile.getPositionInPixels();
		if (this.direction.x === 1 && this.position.x < tilePosition.x) return true;
		if (this.direction.x === -1 && this.position.x > tilePosition.x) return true;
		if (this.direction.y === 1 && this.position.y < tilePosition.y) return true;
		if (this.direction.y === -1 && this.position.y > tilePosition.y) return true;
		return false;
	}

	move(delta: number): { x: number; y: number } {
		let inTile = this.board.getTileFromPixel(this.position);
		if (inTile) {
			this.setInTile(inTile, false);
			if (this.canMove(this.inTile, this.direction)) {
				if (this.inBuffer) {
					this.position.x = this.inTile.getPositionInPixels().x;
					this.position.y = this.inTile.getPositionInPixels().y;
					this.desactivateBuffer();
				} else {
					this.position.x += this.velocity.x * delta;
					this.position.y += this.velocity.y * delta;
				}
			}
		}
		return { x: this.position.x, y: this.position.y };
	}
}
