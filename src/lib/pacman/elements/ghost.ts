import * as PIXI from 'pixi.js';
import type { PacmanBoard } from '../scene/board';

export class Ghost {
	app: PIXI.Application;
	sprite: PIXI.Sprite;
	speed: number;
	direction: { x: number; y: number };
	
	constructor( app: PIXI.Application, texture: PIXI.Texture, x: number, y: number, speed: number) {
        this.app = app;
		this.sprite = new PIXI.Sprite(texture);
		this.sprite.width = 100;
		this.sprite.height = 100;
		this.sprite.x = x;
		this.sprite.y = y;
		this.speed = speed;
		this.direction = { x: 1, y: 0 }; // Initial direction to the right
	}

	move() {
		this.sprite.x += this.direction.x * this.speed;
		this.sprite.y += this.direction.y * this.speed;
	}

	changeDirection(newDirection: { x: number; y: number }) {
		this.direction = newDirection;
	}

	update(delta: number) {
		this.move();
	}
}
