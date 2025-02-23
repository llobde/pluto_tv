import p5 from 'p5';
import * as ml5 from 'ml5';

export class AiBody {
	p5: any;
	debug: boolean = true;
	video: any;
	bodyPose: any;
	poses: any = [];
	connections: any = [];
	loaded: boolean = false;
	onLoad: Function = () => {};
	constructor(p5: p5, onLoad: Function) {
		this.onLoad = onLoad;
		this.p5 = p5;
	}

	async setUp() {
        
		await this.preload();
		this.connections = this.bodyPose.getSkeleton();
        this.video = this.p5.createCapture(this.p5.VIDEO, { flipped: true });
		this.video.size(this.p5.windowWidth, this.p5.windowHeight);
		this.video.hide();
		this.bodyPose.detectStart(this.video, this.gotPoses.bind(this));
		this.onLoad();
	}

    keyPressed(key: string) {
		if (key === 'p') {
			console.log(this.poses);
		}
	}

	preload(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.bodyPose = ml5.bodyPose(
				'MoveNet', // MoveNet (default) and BlazePose
				{
					modelType: 'SINGLEPOSE_THUNDER', // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDER".
					enableSmoothing: true,
					minPoseScore: 0.25,
					multiPoseMaxDimension: 256,
					enableTracking: true,
					trackerType: 'boundingBox', // "keypoint" or "boundingBox"
					trackerConfig: {},
					modelUrl: undefined,
					flipped: true
				},
				(model: any) => {
					// console.log('model loaded', model);
					resolve(model);
				}
			);
		});
	}

	gotPoses(results: any) {
		// Save the output to the poses variable
		this.poses = results;
	}

    hasPoses() {
        return this.poses.length > 0;
    }

	drawSkeleton() {
		// Draw the skeleton connections
		for (let i = 0; i < this.poses.length; i++) {
			let pose = this.poses[i];
			for (let j = 0; j < this.connections.length; j++) {
				let pointAIndex = this.connections[j][0];
				let pointBIndex = this.connections[j][1];
				let pointA = pose.keypoints[pointAIndex];
				let pointB = pose.keypoints[pointBIndex];
				// Only draw a line if both points are confident enough
				if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
					this.p5.stroke(255, 0, 0);
					this.p5.strokeWeight(2);
					this.p5.line(pointA.x, pointA.y, pointB.x, pointB.y);
				}
			}
		}
	}

	drawKeypoints() {
		// Draw all the tracked landmark points
		for (let i = 0; i < this.poses.length; i++) {
			let pose = this.poses[i];
			for (let j = 0; j < pose.keypoints.length; j++) {
				let keypoint = pose.keypoints[j];
				// Only draw a circle if the keypoint's confidence is bigger than 0.1
				if (keypoint.confidence > 0.1) {
					this.p5.fill(0, 255, 0);
					this.p5.noStroke();
					this.p5.circle(keypoint.x, keypoint.y, 10);
				}
			}
		}
	}

    drawVideo() {
        this.p5.image(this.video, 0, 0, this.p5.windowWidth, this.p5.windowHeight);
    }

    drawAll() {
        this.drawVideo();
        this.drawSkeleton();
        this.drawKeypoints();
    }
}
