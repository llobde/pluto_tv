import * as PIXI from 'pixi.js';
import { PacmanBoard, Tile } from '../scene/board';
import { MovementController } from '../controller/movement_controller';

export class MrPacman extends PIXI.Sprite {
	app: PIXI.Application;
	board: PacmanBoard;
	movementController: MovementController;
	reduceRadiusFactor: number;
	initialTile!: Tile;

	constructor(app: PIXI.Application, texture: PIXI.Texture, board: PacmanBoard) {
		super(texture);
		this.app = app;
		this.board = board;
		this.zIndex = 100;
		this.reduceRadiusFactor = board.tileSize * 0.2;
		this.width = (board.tileSize + this.board.tileSize / this.board.wallRefactor) - this.reduceRadiusFactor;
		this.height = (board.tileSize + this.board.tileSize / this.board.wallRefactor) - this.reduceRadiusFactor;
		this.anchor.set(0.5, 0.5);
		this.initialTile = board.pacmanInitialPosition;
		let initialPosition = this.initialTile.getPositionInPixels();
		this.x = initialPosition.x;
		this.y = initialPosition.y;
		this.movementController = new MovementController(board, board.pacmanInitialPosition	);
		this.app.stage.addChild(this);
	}

	get positionInPixels(): { x: number; y: number } {
		return this.movementController.position;
	}

	get inTile(): Tile {
		return this.movementController.inTile;
	}

	public update(delta: number): void {
		let newPosition = this.movementController.move(delta);
		this.x = newPosition.x;
		this.y = newPosition.y;
	}
}
