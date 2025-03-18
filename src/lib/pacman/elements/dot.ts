import * as PIXI from 'pixi.js';
import type { PacmanBoard, Tile } from '../scene/board';
import type { MrPacman } from './mr_pacman';

export class Dot {
	app: PIXI.Application;
	board: PacmanBoard;
	sprite: PIXI.Sprite;
	initialTile: Tile;
	onEat: Function;
	constructor(
		app: PIXI.Application,
		board: PacmanBoard,
		texture: PIXI.Texture,
		initialTile: Tile,
		mrPackman: MrPacman,
		onEat: Function
	) {
		this.app = app;
		this.board = board;
		this.initialTile = initialTile;
		this.onEat = onEat;
		this.sprite = new PIXI.Sprite(texture);
		this.sprite.zIndex = 10;
		this.sprite.anchor.set(0.5);
		this.sprite.width = this.board.tileSize;
		this.sprite.height = this.board.tileSize;
		this.sprite.scale.set(0.1);
		this.sprite.x = this.initialTile.getPositionInPixels().x;
		this.sprite.y = this.initialTile.getPositionInPixels().y;
		this.app.stage.addChild(this.sprite);
	}

	update(delta: number, mrPackman: MrPacman): boolean {
		// console.log('pacman', mrPackman.inTile);
		// console.log('dot', this.initialTile);
		if (this.initialTile.samePosition(mrPackman.inTile)) {
			// console.log('dot eaten');
			this.onEat();
			return true;
		}
		return false;
	}
}
