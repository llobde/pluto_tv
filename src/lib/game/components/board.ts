import p5 from 'p5';
import { AiBody } from './ia';
import { Grid } from './grid';

export class Board {
	p5: p5;
	aiBody: AiBody;
	grid: Grid;
	lastInitDrawTime: number = 0;
	inDrawTime: number = 5;
	constructor(p5: p5, aiBody: AiBody, pnjs: string[]) {
		this.p5 = p5;
		this.aiBody = aiBody;
		this.grid = new Grid(this.p5, pnjs);
	}

    preload() {
        this.grid.preload();
    }

	setUp() {
		this.grid.setUp();
	}

	handInSquare() {
		if (this.aiBody.hasPoses()) {
			const pose = this.aiBody.poses[0];
			const leftWrist = pose.left_wrist;
			const rightWrist = pose.right_wrist;
			const squares = this.grid.randomSquares;
			for (let i = 0; i < squares.length; i++) {
				const square = squares[i];
				if (
					leftWrist.x > square.x &&
					leftWrist.x < square.x + square.width &&
					leftWrist.y > square.y &&
					leftWrist.y < square.y + square.height
				) {
					this.p5.fill(255, 0, 0);
					// this.p5.rect(square.x, square.y, square.width, square.height);
                    this.p5.image(square.image, square.x, square.y, square.width, square.height);
				} else {
					if (
						rightWrist.x > square.x &&
						rightWrist.x < square.x + square.width &&
						rightWrist.y > square.y &&
						rightWrist.y < square.y + square.height
					) {
						this.p5.fill(0, 255, 0);
						// this.p5.rect(square.x, square.y, square.width, square.height);
                        this.p5.image(square.image, square.x, square.y, square.width, square.height);
					} else {
						this.p5.fill(255);
						// this.p5.rect(square.x, square.y, square.width, square.height);
                        this.p5.image(square.image, square.x, square.y, square.width, square.height);
					}
				}
			}
		} else {
			this.grid.draw();
		}
	}

	draw() {
		const currentTime = this.p5.millis();
		if (currentTime - this.lastInitDrawTime > this.inDrawTime * 1000) {
			this.grid.shuffleSqaures();
			this.lastInitDrawTime = currentTime;
		}
		this.handInSquare();
	}
}
