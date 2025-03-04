import * as PIXI from 'pixi.js';
import type { PacmanBoard } from '../scene/board';

export class MrPacman extends PIXI.Sprite {
	app: PIXI.Application;
	private speed: number;
	private direction: { x: number; y: number };
	board: PacmanBoard;
	reduceRadiusFactor: number;

	constructor(app: PIXI.Application, texture: PIXI.Texture, board: PacmanBoard) {
		super(texture);
		this.app = app;
		this.board = board;
		this.speed = 5;
		this.direction = { x: 0, y: 0 };

		this.reduceRadiusFactor = board.tileSize * 0.2;
		this.width = board.tileSize - this.reduceRadiusFactor;
		this.height = board.tileSize - this.reduceRadiusFactor;
		this.anchor.set(0.5);
		// this.scale.set(0.1);

		let initialPosition = board.pacmanInitialPosition;
		this.x = initialPosition.x + this.width / 2;
		this.y = initialPosition.y + this.height / 2;

		window.addEventListener('keydown', this.onKeyDown.bind(this));
		// window.addEventListener('keyup', this.onKeyUp.bind(this));
	}

	private isOnPath(): boolean {
		const tileX = Math.floor(this.x / this.board.tileSize);
		const tileY = Math.floor(this.y / this.board.tileSize);
		return this.board.isPath(tileX, tileY);
	}

	private canMove(newDirection: { x: number; y: number }): boolean {
		const nextX = this.x + newDirection.x * this.speed;
		const nextY = this.y + newDirection.y * this.speed;

		return !this.board.walls.some(
			(wall) =>
				nextX + this.width / 2 > wall.x &&
				nextX - this.width / 2 < wall.x + wall.width &&
				nextY + this.height / 2 > wall.y &&
				nextY - this.height / 2 < wall.y + wall.height
		);
	}

	private onKeyDown(event: KeyboardEvent): void {
		// if (!this.isOnPath()) return;

		let newDirection = { x: 0, y: 0 };
		switch (event.code) {
			case 'ArrowUp':
				newDirection.y = -1;
				break;
			case 'ArrowDown':
				newDirection.y = 1;
				break;
			case 'ArrowLeft':
				newDirection.x = -1;
				break;
			case 'ArrowRight':
				newDirection.x = 1;
				break;
		}

		if (this.canMove(newDirection)) {
			this.direction = newDirection;
		}
	}

	// private onKeyDown(event: KeyboardEvent): void {
	// 	if (!this.isOnPath()) return;

	// 	switch (event.code) {
	// 		case 'ArrowUp':
	// 			this.direction.y = -1;
	// 			this.direction.x = 0;
	// 			break;
	// 		case 'ArrowDown':
	// 			this.direction.y = 1;
	// 			this.direction.x = 0;
	// 			break;
	// 		case 'ArrowLeft':
	// 			this.direction.x = -1;
	// 			this.direction.y = 0;
	// 			break;
	// 		case 'ArrowRight':
	// 			this.direction.x = 1;
	// 			this.direction.y = 0;
	// 			break;
	// 	}
	// }

	private onKeyUp(event: KeyboardEvent): void {
		switch (event.code) {
			case 'ArrowUp':
			case 'ArrowDown':
				this.direction.y = 0;
				break;
			case 'ArrowLeft':
			case 'ArrowRight':
				this.direction.x = 0;
				break;
		}
	}

	private checkCollisions(): boolean {
		for (const wall of this.board.walls) {
			if (
				this.x + this.width / 2 > wall.x &&
				this.x - this.width / 2 < wall.x + wall.width &&
				this.y + this.height / 2 > wall.y &&
				this.y - this.height / 2 < wall.y + wall.height
			) {
				return true;
			}
		}
		return false;
	}

	public update(delta: number): void {
		const nextX = this.x + this.direction.x * this.speed * delta;
		const nextY = this.y + this.direction.y * this.speed * delta;

		const willCollide = this.board.walls.some(
			(wall) =>
				nextX + this.width / 2 > wall.x &&
				nextX - this.width / 2 < wall.x + wall.width &&
				nextY + this.height / 2 > wall.y &&
				nextY - this.height / 2 < wall.y + wall.height
		);

		if (!willCollide) {
			this.x = nextX;
			this.y = nextY;
		}
		// if (this.checkCollisions()) {
		// 	this.direction.x = 0;
		// 	this.direction.y = 0;
		// } else {
		// 	this.x += this.direction.x * this.speed * delta;
		// 	this.y += this.direction.y * this.speed * delta;
		// }
	}
}
