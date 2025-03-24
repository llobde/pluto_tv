import * as PIXI from 'pixi.js';
import { PacmanBoard, Tile } from '../scene/board';
import { MovementController } from '../controller/movement_controller';
import { ClickMovementController } from '../controller/click_movement_controller';

export class MrPacman extends PIXI.Sprite {
	app: PIXI.Application;
	board: PacmanBoard;
	movementController: MovementController | ClickMovementController;
	reduceRadiusFactor: number;
	initialTile!: Tile;

	constructor(app: PIXI.Application, texture: PIXI.Texture, board: PacmanBoard) {
		super(texture);
		this.app = app;
		this.board = board;
		this.zIndex = 100;
		this.reduceRadiusFactor = board.tileSize * 0.1;
		this.width =
			board.tileSize + this.board.tileSize / this.board.wallRefactor - this.reduceRadiusFactor;
		this.height =
			board.tileSize + this.board.tileSize / this.board.wallRefactor - this.reduceRadiusFactor;
		this.anchor.set(0.5, 0.5);
		this.initialTile = board.pacmanInitialPosition;
		let initialPosition = this.initialTile.getPositionInPixels();
		this.x = initialPosition.x;
		this.y = initialPosition.y;
		// this.movementController = new MovementController(board, board.pacmanInitialPosition	);
		this.movementController = new ClickMovementController(board, board.pacmanInitialPosition);
		this.app.stage.addChild(this);
	}

	get positionInPixels(): { x: number; y: number } {
		return this.movementController.position;
	}

	get inTile(): Tile {
		return this.movementController.inTile;
	}

	newClickPosition(position: { x: number; y: number }) {
		(this.movementController as ClickMovementController).newClickPosition(position);
	}

	public update(delta: number): void {
		if (this.movementController instanceof ClickMovementController) {
			let newPosition = this.movementController.moveWithDelta(delta, { x: this.x, y: this.y });
			this.x = newPosition.x;
			this.y = newPosition.y;
		} else if (this.movementController instanceof MovementController) {
			let newPosition = this.movementController.move(delta);
			this.x = newPosition.x;
			this.y = newPosition.y;
		}
	}
}
