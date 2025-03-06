import * as PIXI from 'pixi.js';
import { PacmanBoard } from '../scene/board';
import { GhostController } from '../controller/ai_controller';

export class Ghost {
	app: PIXI.Application;
	sprite: PIXI.Sprite;
	aiController: GhostController;
	board: PacmanBoard;
	speed: number = 5;
	startPosition: { x: number; y: number };

	constructor(
		app: PIXI.Application,
		texture: PIXI.Texture,
		startPosition: { x: number; y: number },
		board: PacmanBoard,
		speed: number
	) {
		this.app = app;
		this.board = board;
		this.startPosition = startPosition;
		this.speed = speed;
		this.sprite = new PIXI.Sprite(texture);
		this.sprite.width = 100;
		this.sprite.height = 100;
		this.sprite.x = startPosition.x;
		this.sprite.y = startPosition.y;
		this.sprite.anchor.set(0.5);
		this.aiController = new GhostController(this.startPosition, this.board, this.speed);
	}

	update(delta: number) {
		let newPosition = this.aiController.move(delta);
		this.sprite.x = newPosition.x;
		this.sprite.y = newPosition.y;
	}
}
