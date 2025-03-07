import * as PIXI from 'pixi.js';
const symbolWall = '1';
const symbolPath = '0';

export interface TilePosition {
	x: number;
	y: number;
}

export interface Direction {
	x: number;
	y: number;
}

export class Directions {
	static UP: Direction = { x: 0, y: -1 };
	static DOWN: Direction = { x: 0, y: 1 };
	static LEFT: Direction = { x: -1, y: 0 };
	static RIGHT: Direction = { x: 1, y: 0 };
}

export class Tile {
	x: number;
	y: number;
	tileSize: number;
	actionSquare: number;
	actionSquarePercentage: number = 0.8;
	simbol: string;
	end: boolean = false;
	constructor(x: number, y: number, tileSize: number, simbol: string, end: boolean = false) {
		this.simbol = simbol;
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;
		this.actionSquare = tileSize * this.actionSquarePercentage;
		this.end = end;
	}

	get position(): TilePosition {
		return { x: this.x, y: this.y };
	}

	set position(position: TilePosition) {
		this.x = position.x;
		this.y = position.y;
	}

	setAsEnd() {
		this.end = true;
	}

	setAsWall() {
		this.simbol = symbolWall;
	}

	setAsEndWall() {
		this.simbol = symbolWall;
		this.end = true;
	}

	setAsPath() {
		this.simbol = symbolPath;
	}

	isWall() {
		return this.simbol === symbolWall;
	}

	isPath() {
		return this.simbol === symbolPath;
	}

	isEnd() {
		return this.end;
	}

	getPositionInPixels(): { x: number; y: number } {
		return {
			x: this.x * this.tileSize + this.tileSize / 2,
			y: this.y * this.tileSize + this.tileSize / 2
		};
	}

	getActionSquarePositionInPixels(): { x: number; y: number } {
		return {
			x: this.x * this.tileSize + this.tileSize / 2 - this.actionSquare / 2,
			y: this.y * this.tileSize + this.tileSize / 2 - this.actionSquare / 2
		};
	}

	pointIsInMiddleOfTile(
		direction: { x: number; y: number },
		position: { x: number; y: number }
	): boolean {
		if (direction.x == 1) {
			if (position.x > this.getPositionInPixels().x) {
				return true;
			}
		} else if (direction.x == -1) {
			if (position.x < this.getPositionInPixels().x) {
				return true;
			}
		}
		if (direction.y == 1) {
			if (position.y > this.getPositionInPixels().y) {
				return true;
			}
		} else if (direction.y == -1) {
			if (position.y < this.getPositionInPixels().y) {
				return true;
			}
		}
		return false;
	}

	isPointInsideActionSquare(point: { x: number; y: number }): boolean {
		const actionSquarePosition = this.getActionSquarePositionInPixels();
		return (
			point.x >= actionSquarePosition.x &&
			point.x <= actionSquarePosition.x + this.actionSquare &&
			point.y >= actionSquarePosition.y &&
			point.y <= actionSquarePosition.y + this.actionSquare
		);
	}
}

class Wall extends PIXI.Graphics {
	color: number;
	constructor(x: number, y: number, width: number, height: number, color: number = 0x0000ff) {
		super();
		this.color = color;
		this.roundRect(this.x, this.y, width, height, 0);
		this.fill(this.color);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

export class PacmanBoard {
	tileSize: number;
	width: number;
	height: number;
	app: PIXI.Application;
	maze: Tile[][] = [];
	walls: Wall[];
	wallFillColor: number = 0x0073ff; //0xffd900;
	wallStrokeWidth: number = 4;
	wallStrokeColor: number = 0x0073ff;
	cols!: number;
	rows!: number;
	pacmanInitialPosition: Tile;
	numghosts: number = 4;
	safeTilesToPositionGhosts: number = 5;
	ghostsInitialPositions: Tile[] = [];
	dotsInitialPositions: { x: number; y: number }[] = [];
	debug: boolean = true;

	constructor(
		app: PIXI.Application,
		width: number = 800,
		height: number = 600,
		tileSize: number = 100
	) {
		this.app = app;
		this.tileSize = tileSize;
		this.width = width;
		this.height = height;
		this.walls = [];
		this.maze = this.generateSymmetricalPacmanMaze();
		this.pacmanInitialPosition = this.getPacmanInitialPosition();
		this.ghostsInitialPositions = this.getGhostsInitialPosition(
			this.pacmanInitialPosition,
			this.safeTilesToPositionGhosts,
			this.numghosts
		);
		this.dotsInitialPositions = this.getDotsPosition();
		if (this.debug) {
			this.drawDebugGrid();
			// this.drawTilesPositions();
			// this.drawActionSquares();
		}
		this.connectWalls();
		console.log(this.maze);
	}

	// UTIL FUNCTIONS

	getAdjacentsTiles(tile: Tile): Tile[] {
		let adjacents: Tile[] = [];
		let directions = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];
		for (let direction of directions) {
			let adjacent = this.getAdjacentTileInDirection(tile, direction);
			if (adjacent) {
				adjacents.push(adjacent);
			}
		}
		return adjacents;
	}

	getAdjacentTileInDirection(tile: Tile, direction: Direction): Tile | null {
		let x = tile.x + direction.x;
		let y = tile.y + direction.y;
		if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
			return this.maze[y][x];
		}
		return null;
	}

	getLastTilePathInDirection(tile: Tile, direction: Direction): Tile | null {
		let inTile: Tile = tile;
		let x = tile.x;
		let y = tile.y;
		while (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
			let nextTile = this.getAdjacentTileInDirection(inTile, direction);
			if (nextTile != null && nextTile.isPath()) {
				inTile = nextTile;
			} else {
				return inTile;
			}
		}
		return inTile;
	}

	getTileFromPixel(position: { x: number; y: number }): Tile | null {
		const tileX = Math.floor(position.x / this.tileSize);
		const tileY = Math.floor(position.y / this.tileSize);
		if (tileX >= 0 && tileX < this.cols && tileY >= 0 && tileY < this.rows) {
			return this.maze[tileY][tileX];
		}
		return null;
	}
	// END UTILS

	drawDebugGrid() {
		const graphics = new PIXI.Graphics();

		for (let x = 0; x <= this.width; x += this.tileSize) {
			graphics.moveTo(x, 0);
			graphics.lineTo(x, this.height);
		}

		for (let y = 0; y <= this.height; y += this.tileSize) {
			graphics.moveTo(0, y);
			graphics.lineTo(this.width, y);
		}
		graphics.stroke({ width: 1, color: 0xffffff, alpha: 0.5 });

		this.app.stage.addChild(graphics);
	}

	getPacmanInitialPosition(): Tile {
		let pacmanPosition: Tile | null = null;
		while (!pacmanPosition) {
			let x = Math.floor(Math.random() * this.cols);
			let y = Math.floor(Math.random() * this.rows);
			if (this.maze[y][x].isPath()) {
				pacmanPosition = this.maze[y][x];
			}
		}
		console.log(`Pacman initial tile position: (${pacmanPosition.x}, ${pacmanPosition.y})`);
		return pacmanPosition;
	}

	getGhostsInitialPosition(
		pacmanInitialPosition: Tile,
		safeTilesToPositionGhosts: number,
		numGhosts: number
	) {
		// Set initial position of Ghosts randomly in a path
		let ghostPositions: Tile[] = [];
		while (ghostPositions.length < numGhosts) {
			let x = Math.floor(Math.random() * this.cols);
			let y = Math.floor(Math.random() * this.rows);
			let distanceToPacman = Math.sqrt(
				Math.pow(x - pacmanInitialPosition.x / this.tileSize, 2) +
					Math.pow(y - pacmanInitialPosition.y / this.tileSize, 2)
			);
			if (this.maze[y][x].isPath() && distanceToPacman >= safeTilesToPositionGhosts) {
				ghostPositions.push(new Tile(x, y, this.tileSize, symbolPath));
			}
		}
		return ghostPositions;
	}

	getDotsPosition() {
		const dots: { x: number; y: number }[] = [];
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				if (this.maze[y][x].isPath()) {
					const dotPosition = { x: x * this.tileSize, y: y * this.tileSize };
					if (
						dotPosition.x !== this.pacmanInitialPosition.x ||
						dotPosition.y !== this.pacmanInitialPosition.y
					) {
						dots.push(dotPosition);
					}
				}
			}
		}
		return dots;
	}

	generateSymmetricalPacmanMaze(): Tile[][] {
		let cols = Math.floor(this.width / this.tileSize);
		let rows = Math.floor(this.height / this.tileSize);
		if (cols % 2 === 0) cols -= 1;
		if (rows % 2 === 0) rows -= 1;
		this.cols = cols;
		this.rows = rows;

		let maze: Tile[][] = Array.from({ length: rows }, (_, y) =>
			Array.from({ length: cols }, (_, x) => new Tile(x, y, this.tileSize, symbolWall))
		);

		let stack = [{ x: 1, y: 1 }];
		maze[1][1].setAsPath();

		let directions = [
			{ x: 0, y: -2 },
			{ x: 0, y: 2 },
			{ x: -2, y: 0 },
			{ x: 2, y: 0 }
		];

		while (stack.length > 0) {
			let { x, y } = stack.pop()!;
			directions.sort(() => Math.random() - 0.5);

			for (let { x: dx, y: dy } of directions) {
				let nx = x + dx;
				let ny = y + dy;
				if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx].isWall()) {
					maze[ny][nx].setAsPath();
					maze[y + dy / 2][x + dx / 2].setAsPath();
					stack.push({ x: nx, y: ny });
				}
			}
		}

		// Create symmetry
		for (let y = 0; y < Math.floor(rows / 2); y++) {
			for (let x = 0; x < cols; x++) {
				maze[rows - 1 - y][x].simbol = maze[y][x].simbol;
			}
		}

		// Ensure outer walls are closed
		for (let x = 0; x < cols; x++) {
			maze[0][x].setAsEndWall();
			maze[rows - 1][x].setAsEndWall();
		}
		for (let y = 0; y < rows; y++) {
			maze[y][0].setAsEndWall();
			maze[y][cols - 1].setAsEndWall();
		}

		// Connect isolated paths
		for (let y = 1; y < rows - 1; y++) {
			for (let x = 1; x < cols - 1; x++) {
				if (maze[y][x].isPath()) {
					let neighbors = [
						[y - 1, x],
						[y + 1, x],
						[y, x - 1],
						[y, x + 1]
					].filter(([ny, nx]) => maze[ny][nx].isPath());

					if (neighbors.length === 1) {
						let [ny, nx] = neighbors[0];
						if (ny === y - 1 || ny === y + 1) {
							if (x > 1 && maze[y][x - 1].isWall() && maze[y][x + 1].isWall()) {
								maze[y][x - 1].setAsPath();
								maze[y][x + 1].setAsPath();
							}
						} else if (nx === x - 1 || nx === x + 1) {
							if (y > 1 && maze[y - 1][x].isWall() && maze[y + 1][x].isWall()) {
								maze[y - 1][x].setAsPath();
								maze[y + 1][x].setAsPath();
							}
						}
					}
				}
			}
		}

		// Set external walls
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				if (y === 0 || y === rows - 1 || x === 0 || x === cols - 1) {
					maze[y][x].setAsWall();
				}
			}
		}

		// Add one random exit
		let exitAdded = false;
		let exitPosition = { x: 0, y: 0 };
		while (!exitAdded) {
			const side = Math.floor(Math.random() * 4);
			let x = 0,
				y = 0;
			switch (side) {
				case 0: // top
					x = Math.floor(Math.random() * (cols - 2)) + 1;
					y = 0;
					break;
				case 1: // bottom
					x = Math.floor(Math.random() * (cols - 2)) + 1;
					y = rows - 1;
					break;
				case 2: // left
					y = Math.floor(Math.random() * (rows - 2)) + 1;
					x = 0;
					break;
				case 3: // right
					y = Math.floor(Math.random() * (rows - 2)) + 1;
					x = cols - 1;
					break;
			}
			if (maze[y][x].isWall()) {
				maze[y][x].setAsPath();
				exitAdded = true;
				exitPosition = { x: x, y: y };
			}
		}

		// Add another exit opposite to the first exit
		let oppositeExitAdded = false;
		while (!oppositeExitAdded) {
			let oppositeX = cols - 1 - exitPosition.x;
			let oppositeY = rows - 1 - exitPosition.y;
			if (maze[oppositeY][oppositeX].isWall()) {
				let neighbors = [
					{ x: oppositeX - 1, y: oppositeY },
					{ x: oppositeX + 1, y: oppositeY },
					{ x: oppositeX, y: oppositeY - 1 },
					{ x: oppositeX, y: oppositeY + 1 }
				];
				let hasPathNeighbor = neighbors.some(
					({ x, y }) => x >= 0 && x < cols && y >= 0 && y < rows && maze[y][x].isPath()
				);
				if (hasPathNeighbor) {
					maze[oppositeY][oppositeX].setAsPath();
					oppositeExitAdded = true;
				} else {
					// Find the first wall with a path neighbor
					for (let { x, y } of neighbors) {
						if (x >= 0 && x < cols && y >= 0 && y < rows && maze[y][x].isWall()) {
							let furtherNeighbors = [
								{ x: x - 1, y: y },
								{ x: x + 1, y: y },
								{ x: x, y: y - 1 },
								{ x: x, y: y + 1 }
							];
							if (
								furtherNeighbors.some(
									({ x, y }) => x >= 0 && x < cols && y >= 0 && y < rows && maze[y][x].isPath()
								)
							) {
								maze[y][x].setAsPath();
								oppositeExitAdded = true;
								break;
							}
						}
					}
				}
			}
		}

		return maze;
	}

	addWall(wall: Wall) {
		this.walls.push(wall);
	}

	connectWalls() {
		for (let y = 0; y < this.maze.length; y++) {
			for (let x = 0; x < this.maze[y].length; x++) {
				if (this.maze[y][x].isWall()) {
					this.addWall(
						new Wall(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
					);
					let neighbors = [
						[y - 1, x],
						[y + 1, x],
						[y, x - 1],
						[y, x + 1]
					];

					let isIsolated = neighbors.every(([ny, nx]) => {
						return (
							ny < 0 ||
							ny >= this.maze.length ||
							nx < 0 ||
							nx >= this.maze[ny].length ||
							this.maze[ny][nx].isPath()
						);
					});

					if (isIsolated) {
						let rect = new PIXI.Graphics();
						rect.roundRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize, 40);
						rect.fill(this.wallFillColor);
						rect.stroke({ width: this.wallStrokeWidth, color: this.wallStrokeColor, cap: 'round' });
						this.app.stage.addChild(rect);
					} else {
						for (let [ny, nx] of neighbors) {
							if (
								ny >= 0 &&
								ny < this.maze.length &&
								nx >= 0 &&
								nx < this.maze[ny].length &&
								this.maze[ny][nx].isWall()
							) {
								let line = new PIXI.Graphics();
								line.moveTo(
									x * this.tileSize + this.tileSize / 2,
									y * this.tileSize + this.tileSize / 2
								);
								line.lineTo(
									nx * this.tileSize + this.tileSize / 2,
									ny * this.tileSize + this.tileSize / 2
								);
								line.fill(this.wallFillColor);
								line.stroke({ width: this.tileSize, color: this.wallStrokeColor, cap: 'round' });
								this.app.stage.addChild(line);
							}
						}
					}
				}
			}
		}
	}

	drawWalls() {
		for (let y = 0; y < this.maze.length; y++) {
			for (let x = 0; x < this.maze[y].length; x++) {
				if (this.maze[y][x].isWall()) {
					let wall = new Wall(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
					this.addWall(wall);
					this.app.stage.addChild(wall);
				}
			}
		}
	}

	drawTilesPositions() {
		for (let y = 0; y < this.maze.length; y++) {
			for (let x = 0; x < this.maze[y].length; x++) {
				if (this.maze[y][x].isPath()) {
					const basicText = new PIXI.Text({ text: `${x}:${y}`, style: { fill: 'white' } });
					let position = this.maze[y][x].getPositionInPixels();
					basicText.x = position.x;
					basicText.y = position.y;
					this.app.stage.addChild(basicText);
					// let dot = new PIXI.Graphics();
					// dot.circle(0, 0, this.tileSize / 12);
					// dot.fill(0xffffff);
					// this.getTileCenterPosition(x, y);
					// dot.x = x * this.tileSize + this.tileSize / 2;
					// dot.y = y * this.tileSize + this.tileSize / 2;
					// this.app.stage.addChild(dot);
				}
			}
		}
	}

	drawActionSquares() {
		for (let y = 0; y < this.maze.length; y++) {
			for (let x = 0; x < this.maze[y].length; x++) {
				if (this.maze[y][x].isPath()) {
					let actionSquarePosition = this.maze[y][x].getActionSquarePositionInPixels();
					let actionSquare = new PIXI.Graphics();
					actionSquare.rect(
						actionSquarePosition.x,
						actionSquarePosition.y,
						this.maze[y][x].actionSquare,
						this.maze[y][x].actionSquare
					);
					actionSquare.fill(0xff0000);
					this.app.stage.addChild(actionSquare);
				}
			}
		}
	}
}
