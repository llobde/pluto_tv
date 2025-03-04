import * as PIXI from 'pixi.js';
import type { PacmanBoard } from '../scene/board';

// export class Dot extends PIXI.Sprite {
// 	app: PIXI.Application;
// 	constructor(app: PIXI.Application, texture: PIXI.Texture) {
// 		super(texture);
//         this.app = app;
// 		this.anchor.set(0.5);
// 		this.scale.set(0.5);
// 	}
// }

export class Dot extends PIXI.Graphics {
	app: PIXI.Application;
	board: PacmanBoard;
	constructor(
		app: PIXI.Application,
		board: PacmanBoard,
		x: number,
		y: number,
		// radius: number,
		color: number = 0xffffff
	) {
		super();
		this.app = app;
		this.board = board;
        this.circle(0, 0, this.board.tileSize / 12);
		this.fill(color);
        this.x = x + this.board.tileSize / 2;
        this.y = y + this.board.tileSize / 2;
		// this.x = x;
		// this.y = y;
		this.app.stage.addChild(this);
	}
}
