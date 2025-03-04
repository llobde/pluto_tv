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
		console.log("Board setup")
	}

	handInSquare() {
		if (this.aiBody.hasPoses()) {
			const pose = this.aiBody.poses[0];
			const leftWrist = pose.left_wrist;
			const rightWrist = pose.right_wrist;
			for (let i = 0; i < this.grid.selectables.length; i++) {
				const selectable = this.grid.selectables[i];
				if (
					leftWrist.x > selectable.x &&
					leftWrist.x < selectable.x + selectable.width &&
					leftWrist.y > selectable.y &&
					leftWrist.y < selectable.y + selectable.height
				) {
					this.grid.selectables[i].selected = true;
					this.grid.selectables[i].draw();
				} else {
					if (
						rightWrist.x > selectable.x &&
						rightWrist.x < selectable.x + selectable.width &&
						rightWrist.y > selectable.y &&
						rightWrist.y < selectable.y + selectable.height
					) {
						this.grid.selectables[i].selected = true;
						this.grid.selectables[i].draw();
					} else {
						this.grid.selectables[i].selected = false;
						this.grid.selectables[i].draw();
					}
				}
			}
		} else {
			// this.grid.draw();
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
