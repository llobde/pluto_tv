import p5 from 'p5';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';

export class Grid {
	p5: p5;
	pnjs: string[] = [];
	images: any[] = [];
	gridSize = 0.25;
	cols: number;
	rows: number;
	squares: {id: string, x: number; y: number; width: number; height: number, image: any }[] = [];
	randomSquares: {id: string, x: number; y: number; width: number; height: number, image: any }[] = [];
	constructor(p5: p5, pnjs: string[]) {
		console.log('Grid');
		this.p5 = p5;
		this.pnjs = pnjs;
		this.cols = this.getCols();
		this.rows = this.getRows();
		// this.squares = this.getSquares();
		// this.randomSquares = this.getRandSquares(4);
		console.log(this.cols, this.rows);
	}

	preload() {
		for (let i = 0; i < this.pnjs.length; i++) {
			let image = this.p5.loadImage(this.pnjs[i]);
			this.images.push(image);
		}
        this.squares = this.getSquares();
        this.randomSquares = this.getRandSquares(4);
	}

	getSquares() {
		const squares = [];
		for (let i = 0; i < this.cols; i++) {
			for (let j = 0; j < this.rows; j++) {
				const x = i * (this.p5.windowWidth * this.gridSize);
				const y = j * (this.p5.windowHeight * this.gridSize);
                squares.push({
                    id: uuidv4(),
                    x,
                    y,
                    width: this.p5.windowWidth * this.gridSize,
                    height: this.p5.windowHeight * this.gridSize,
                    image: this.images[(i * this.rows + j) % this.images.length]
                });
			}
		}
		return squares;
	}

	getRows() {
		return Math.floor(this.p5.windowHeight / (this.p5.windowHeight * this.gridSize));
	}

	getCols() {
		return Math.floor(this.p5.windowWidth / (this.p5.windowWidth * this.gridSize));
	}

	setUp() {}

	drawLines() {
		this.p5.push();
		this.p5.stroke(255);
		this.p5.strokeWeight(1);

		for (let i = 0; i <= this.cols; i++) {
			let x = i * (this.p5.windowWidth * this.gridSize);
			this.p5.line(x, 0, x, this.p5.windowHeight);
		}

		for (let j = 0; j <= this.rows; j++) {
			let y = j * (this.p5.windowHeight * this.gridSize);
			this.p5.line(0, y, this.p5.windowWidth, y);
		}
		this.p5.pop();
	}

	drawSquares() {
		this.p5.push();
		this.p5.noFill();
		this.p5.stroke(255);
		this.p5.strokeWeight(1);
		for (let i = 0; i < this.squares.length; i++) {
			const square = this.squares[i];
			this.p5.rect(square.x, square.y, square.width, square.height);
		}
		this.p5.pop();
	}

	getRandSquares(max: number) {
		let shuffled = this.squares.sort(() => 0.5 - Math.random());
        let sliced = shuffled.slice(0, max);
        sliced[1].image = sliced[0].image;
        sliced[1].id = sliced[0].id;
        return sliced;
	}

	drawRandSquares() {
		this.p5.push();
		this.p5.noFill();
		this.p5.stroke(255);
		this.p5.strokeWeight(1);
		for (let i = 0; i < this.randomSquares.length; i++) {
			const square = this.randomSquares[i];
			this.p5.rect(square.x, square.y, square.width, square.height);
		}
		this.p5.pop();
	}

	shuffleSqaures() {
		this.randomSquares = this.getRandSquares(4);
	}

	draw() {
		this.drawRandSquares();
	}

	windowResized() {
		this.cols = this.getCols();
		this.rows = this.getRows();
	}
}
