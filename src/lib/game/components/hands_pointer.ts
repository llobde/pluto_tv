import p5 from 'p5';
import { AiBody } from './ia';
export class HandsPointer {
	p5: p5;
	aiBody: AiBody;
	hand_l: any;
	hand_r: any;
	minConfidence: number = 0.4;
	constructor(p5: p5, aiBody: AiBody, hand_l: any, hand_r: any) {
		this.hand_l = hand_l;
		this.hand_r = hand_r;
		this.aiBody = aiBody;
		this.p5 = p5;
	}

	preload() {
		this.hand_l = this.p5.loadImage(this.hand_l);
		this.hand_r = this.p5.loadImage(this.hand_r);
	}

	setUp() {}

	draw() {
		if (this.aiBody.poses.length === 0) {
			return;
		}
		let pose = this.aiBody.poses[0];
		this.p5.push();
		this.p5.fill(255, 0, 0);
		this.p5.noStroke();
		if (pose.left_wrist.confidence > this.minConfidence) {
			this.p5.circle(pose.left_wrist.x, pose.left_wrist.y, 20);
		}
		if (pose.right_wrist.confidence > this.minConfidence) {
			this.p5.circle(pose.right_wrist.x, pose.right_wrist.y, 20);
		}
		this.p5.pop();
		if (pose.left_wrist.confidence > this.minConfidence) {
			this.p5.image(this.hand_l, pose.left_wrist.x - 100, pose.left_wrist.y - 100, 200, 200);
		}
		if (pose.right_wrist.confidence > this.minConfidence) {
			this.p5.image(this.hand_r, pose.right_wrist.x - 100, pose.right_wrist.y - 100, 200, 200);
		}
	}
}
