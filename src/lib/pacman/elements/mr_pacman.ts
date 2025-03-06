import * as PIXI from 'pixi.js';
import { PacmanBoard } from '../scene/board';
import { MovementController } from '../controller/movement_controller';

export class MrPacman extends PIXI.Sprite {
	app: PIXI.Application;
	board: PacmanBoard;
	movementController: MovementController;
	reduceRadiusFactor: number;

	constructor(app: PIXI.Application, texture: PIXI.Texture, board: PacmanBoard) {
		super(texture);
		this.app = app;
		this.board = board;

		this.reduceRadiusFactor = board.tileSize * 0.2;
		this.width = board.tileSize - this.reduceRadiusFactor;
		this.height = board.tileSize - this.reduceRadiusFactor;
		this.anchor.set(0.5, 0.5);

		this.x = board.pacmanInitialPosition.x;
		this.y = board.pacmanInitialPosition.y;
		this.movementController = new MovementController(board.pacmanInitialPosition, board);
		
	}

	

	public update(delta: number): void {
		let newPosition = this.movementController.move(delta);
		this.x = newPosition.x;
		this.y = newPosition.y;
	}
}
