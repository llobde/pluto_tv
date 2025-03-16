import * as PIXI from 'pixi.js';
import { PacmanBoard, Tile } from '../scene/board';
import { GhostController } from '../controller/ai_controller';
import type { MrPacman } from './mr_pacman';

export class Ghost {
	app: PIXI.Application;
	sprite: PIXI.Sprite;
	aiController: GhostController;
	board: PacmanBoard;
	mrPacman: MrPacman;
	speed: number = 5;
	initialTile: Tile;
	onEat: Function;

	constructor(
		app: PIXI.Application,
		texture: PIXI.Texture,
		initialTile: Tile,
		board: PacmanBoard,
		mrPackman: MrPacman,
		speed: number,
		onEat: Function
	) {
		this.app = app;
		this.board = board;
		this.mrPacman = mrPackman;
		this.initialTile = initialTile;
		this.speed = speed;
		this.sprite = new PIXI.Sprite(texture);
		this.sprite.zIndex = 20;
		this.sprite.width = 100;
		this.sprite.height = 100;
		this.sprite.x = this.initialTile.getPositionInPixels().x;
		this.sprite.y = this.initialTile.getPositionInPixels().y;
		this.sprite.anchor.set(0.5);
		this.onEat = onEat;
		this.aiController = new GhostController(this.initialTile, this.board, this.speed, () => {
			this.onEat();
		});
	}

	kill() {
		this.aiController.kill();
		this.app.stage.removeChild(this.sprite);
	}

	isKilled() {
		return this.aiController.isKilled();
	}

	update(delta: number) {
		this.aiController.update(delta, this.mrPacman);
		this.sprite.x = this.aiController.position.x;
		this.sprite.y = this.aiController.position.y;
	}
}
