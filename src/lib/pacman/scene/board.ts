import * as PIXI from 'pixi.js';

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
	maze: number[][] = [];
	walls: Wall[];
	wallFillColor: number = 0x0073ff; //0xffd900;
	wallStrokeWidth: number = 4;
	wallStrokeColor: number = 0x0073ff;
	cols!: number;
	rows!: number;
	pacmanInitialPosition: { x: number; y: number };
	numghosts: number = 4;
	safeTilesToPositionGhosts: number = 5;
	ghostsInitialPositions: { x: number; y: number }[] = [];
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
		// this.maze = [];
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
		}
		console.log(this.maze);
	}

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

	getPacmanInitialPosition() {
		// Get initial position of Pacman randomly in a path
		let pacmanPosition: { x: number; y: number } | null = null;
		while (!pacmanPosition) {
			let x = Math.floor(Math.random() * this.cols);
			let y = Math.floor(Math.random() * this.rows);
			if (this.maze[y][x] === 0) {
				let position = this.getTileCenterPosition(x, y);
				pacmanPosition = position;
			}
		}
		console.log(`Pacman initial position: (${pacmanPosition.x}, ${pacmanPosition.y})`);
		return pacmanPosition;
	}

	getGhostsInitialPosition(
		pacmanInitialPosition: { x: number; y: number },
		safeTilesToPositionGhosts: number,
		numGhosts: number
	) {
		// Set initial position of Ghosts randomly in a path
		let ghostPositions: { x: number; y: number }[] = [];
		while (ghostPositions.length < numGhosts) {
			let x = Math.floor(Math.random() * this.cols);
			let y = Math.floor(Math.random() * this.rows);
			let distanceToPacman = Math.sqrt(
				Math.pow(x - pacmanInitialPosition.x / this.tileSize, 2) +
					Math.pow(y - pacmanInitialPosition.y / this.tileSize, 2)
			);
			if (this.maze[y][x] === 0 && distanceToPacman >= safeTilesToPositionGhosts) {
				ghostPositions.push({
					x: x * this.tileSize,
					y: y * this.tileSize
				});
			}
		}
		return ghostPositions;
	}

	getDotsPosition() {
		const dots: { x: number; y: number }[] = [];
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				if (this.maze[y][x] === 0) {
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

	generateSymmetricalPacmanMaze() {
		let cols = Math.floor(this.width / this.tileSize);
		let rows = Math.floor(this.height / this.tileSize);
		if (cols % 2 === 0) cols -= 1;
		if (rows % 2 === 0) rows -= 1;
		this.cols = cols;
		this.rows = rows;

		let maze = Array.from({ length: rows }, () => Array(cols).fill(1));

		let stack = [[1, 1]];
		maze[1][1] = 0;

		let directions = [
			[0, -2],
			[0, 2],
			[-2, 0],
			[2, 0]
		];

		while (stack.length > 0) {
			let [x, y] = stack.pop()!;
			directions.sort(() => Math.random() - 0.5);

			for (let [dx, dy] of directions) {
				let nx = x + dx,
					ny = y + dy;
				if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx] === 1) {
					maze[ny][nx] = 0;
					maze[y + dy / 2][x + dx / 2] = 0;
					stack.push([nx, ny]);
				}
			}
		}

		// Add cycles
		for (let y = 1; y < rows - 1; y += 2) {
			for (let x = 1; x < cols - 1; x += 2) {
				if (Math.random() < 0.3) {
					let [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
					let nx = x + dx,
						ny = y + dy;
					if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1) {
						maze[ny][nx] = 0;
					}
				}
			}
		}

		// Add Pacman home
		let homeSize = 3;
		let homeX = Math.floor(cols / 2) - 1;
		let homeY = Math.floor(rows / 2) - 1;
		for (let y = homeY; y < homeY + homeSize; y++) {
			for (let x = homeX; x < homeX + homeSize; x++) {
				maze[y][x] = 0;
			}
		}

		// Create vertical symmetry
		for (let y = 0; y < Math.floor(rows / 2); y++) {
			for (let x = 0; x < cols; x++) {
				maze[rows - 1 - y][x] = maze[y][x];
			}
		}

		// Ensure external wall is closed
		for (let x = 0; x < cols; x++) {
			maze[0][x] = 1;
			maze[rows - 1][x] = 1;
		}
		for (let y = 0; y < rows; y++) {
			maze[y][0] = 1;
			maze[y][cols - 1] = 1;
		}

		// Connect isolated paths
		for (let y = 1; y < rows - 1; y++) {
			for (let x = 1; x < cols - 1; x++) {
				if (maze[y][x] === 0) {
					let neighbors = [
						[y - 1, x],
						[y + 1, x],
						[y, x - 1],
						[y, x + 1]
					].filter(([ny, nx]) => maze[ny][nx] === 0);

					if (neighbors.length === 1) {
						let [ny, nx] = neighbors[0];
						if (ny === y - 1 || ny === y + 1) {
							if (x > 1 && maze[y][x - 1] === 1 && maze[y][x + 1] === 1) {
								maze[y][x - 1] = 0;
								maze[y][x + 1] = 0;
							}
						} else if (nx === x - 1 || nx === x + 1) {
							if (y > 1 && maze[y - 1][x] === 1 && maze[y + 1][x] === 1) {
								maze[y - 1][x] = 0;
								maze[y + 1][x] = 0;
							}
						}
					}
				}
			}
		}

		// Ensure there are two exits
		let exits = 0;
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				if ((y === 0 || y === rows - 1 || x === 0 || x === cols - 1) && maze[y][x] === 0) {
					exits++;
				}
			}
		}
		console.log(`Number of exits: ${exits}`);
		while (exits < 2) {
			let side = Math.floor(Math.random() * 4);
			let x: number | null = null,
				y: number | null = null;
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
					x = 0;
					y = Math.floor(Math.random() * (rows - 2)) + 1;
					break;
				case 3: // right
					x = cols - 1;
					y = Math.floor(Math.random() * (rows - 2)) + 1;
					break;
			}
			if (x != null && y != null) {
				if (maze[y][x] === 1) {
					maze[y][x] = 0;
					exits++;
				}
			}
		}

		return maze;
	}

	generateMazeBacktracking() {
		let cols = Math.floor(this.width / this.tileSize);
		let rows = Math.floor(this.height / this.tileSize);
		if (cols % 2 === 0) cols -= 1;
		if (rows % 2 === 0) rows -= 1;

		let laberinto = Array.from({ length: rows }, () => Array(cols).fill(1));

		function backtracking(x: number, y: number) {
			let direcciones = [
				[0, -2],
				[0, 2],
				[-2, 0],
				[2, 0]
			];
			direcciones.sort(() => Math.random() - 0.5);

			for (let [dx, dy] of direcciones) {
				let nx = x + dx,
					ny = y + dy;
				if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && laberinto[ny][nx] === 1) {
					laberinto[ny][nx] = 0;
					laberinto[y + dy / 2][x + dx / 2] = 0;
					backtracking(nx, ny);
				}
			}
		}

		let inicioX = 1;
		let inicioY = 1;
		laberinto[inicioY][inicioX] = 0;
		backtracking(inicioX, inicioY);

		return laberinto;
	}

	isWall(x: number, y: number): boolean {
		return this.maze[y] && this.maze[y][x] === 1;
	}

	addWall(wall: Wall) {
		this.walls.push(wall);
	}

	isPath(x: number, y: number) {
		try {
			return this.maze[y][x] === 0;
		} catch (error) {
			return false;
		}
	}

	connectWalls() {
		for (let y = 0; y < this.maze.length; y++) {
			for (let x = 0; x < this.maze[y].length; x++) {
				if (this.maze[y][x] === 1) {
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
							this.maze[ny][nx] === 0
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
								this.maze[ny][nx] === 1
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
				if (this.maze[y][x] === 1) {
					let wall = new Wall(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
					this.addWall(wall);
					this.app.stage.addChild(wall);
				}
			}
		}
	}

	getTilePosition(x: number, y: number) {
		return { x: x * this.tileSize, y: y * this.tileSize };
	}

	getTileCenterPosition(x: number, y: number) {
		return { x: x * this.tileSize + this.tileSize / 2, y: y * this.tileSize + this.tileSize / 2 };
	}

	drawTilesPositions() {
		for (let y = 0; y < this.maze.length; y++) {
			for (let x = 0; x < this.maze[y].length; x++) {
				if (this.maze[y][x] === 0) {
					let dot = new PIXI.Graphics();
					dot.circle(0, 0, this.tileSize / 12);
					dot.fill(0xffffff);
					this.getTileCenterPosition(x, y);
					dot.x = x * this.tileSize + this.tileSize / 2;
					dot.y = y * this.tileSize + this.tileSize / 2;
					this.app.stage.addChild(dot);
				}
			}
		}
	}
}
