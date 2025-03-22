import type { Ghost } from '../elements/ghost';
import type { MrPacman } from '../elements/mr_pacman';
import type { PacmanBoard, Tile } from '../scene/board';

export class Chase {
	board: PacmanBoard;

	constructor(board: PacmanBoard) {
		this.board = board;
	}
	private heuristic(a: Tile, b: Tile): number {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	}

	private getNeighbors(tile: Tile): Tile[] {
		let adjacents = this.board.getAdjacentsTiles(tile);
		return adjacents;
	}

	private reconstructPath(cameFrom: Map<Tile, Tile>, current: Tile): Tile[] {
		const totalPath = [current];
		while (cameFrom.has(current)) {
			current = cameFrom.get(current)!;
			totalPath.push(current);
		}
		return totalPath.reverse();
	}

	private aStar(start: Tile, goal: Tile): Tile[] {
		const openSet = new Set<Tile>();
		openSet.add(start);

		const cameFrom = new Map<Tile, Tile>();

		const gScore = new Map<Tile, number>();
		gScore.set(start, 0);

		const fScore = new Map<Tile, number>();
		fScore.set(start, this.heuristic(start, goal));

		while (openSet.size > 0) {
			let current = Array.from(openSet).reduce((lowest, tile) => {
				return fScore.get(tile)! < fScore.get(lowest)! ? tile : lowest;
			});

			if (current === goal) {
				return this.reconstructPath(cameFrom, current);
			}

			openSet.delete(current);

			for (let neighbor of this.getNeighbors(current)) {
				const tentativeGScore = gScore.get(current)! + 1;

				if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
					cameFrom.set(neighbor, current);
					gScore.set(neighbor, tentativeGScore);
					fScore.set(neighbor, tentativeGScore + this.heuristic(neighbor, goal));
					if (!openSet.has(neighbor)) {
						openSet.add(neighbor);
					}
				}
			}
		}

		return [];
	}

	public findPathToPacman(mrPacman: MrPacman, inTile: Tile): Tile[] {
		const pacmanTile = mrPacman.inTile;
		return this.aStar(inTile, pacmanTile);
	}
}

export class Escape {
	board: PacmanBoard;

	constructor(board: PacmanBoard) {
		this.board = board;
	}

	private heuristic(a: Tile, b: Tile): number {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	}

	private getNeighbors(tile: Tile): Tile[] {
		let adjacents = this.board.getAdjacentsTiles(tile);
		return adjacents;
	}

	private reconstructPath(cameFrom: Map<Tile, Tile>, current: Tile): Tile[] {
		const totalPath = [current];
		while (cameFrom.has(current)) {
			current = cameFrom.get(current)!;
			totalPath.push(current);
		}
		return totalPath.reverse();
	}

	private aStar(start: Tile, goal: Tile): Tile[] {
		const openSet = new Set<Tile>();
		openSet.add(start);

		const cameFrom = new Map<Tile, Tile>();

		const gScore = new Map<Tile, number>();
		gScore.set(start, 0);

		const fScore = new Map<Tile, number>();
		fScore.set(start, this.heuristic(start, goal));

		while (openSet.size > 0) {
			let current = Array.from(openSet).reduce((lowest, tile) => {
				return fScore.get(tile)! < fScore.get(lowest)! ? tile : lowest;
			});

			if (current === goal) {
				return this.reconstructPath(cameFrom, current);
			}

			openSet.delete(current);
			let neighbors = this.getNeighbors(current);
			for (let neighbor of this.getNeighbors(current)) {
				const tentativeGScore = gScore.get(current)! + 1;

				if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
					cameFrom.set(neighbor, current);
					gScore.set(neighbor, tentativeGScore);
					fScore.set(neighbor, tentativeGScore + this.heuristic(neighbor, goal));
					if (!openSet.has(neighbor)) {
						openSet.add(neighbor);
					}
				}
			}
		}

		return [];
	}

	public findPathAwayFromPacman(mrPacman: MrPacman, inTile: Tile): Tile[] {
		const pacmanTile = mrPacman.inTile;
		const furthestTile = this.board.getRandomFurthestValidTile(pacmanTile, 5);
		if (!furthestTile) {
			let adjacents = this.board.getAdjacentsTiles(inTile);
			let randomIndex = Math.floor(Math.random() * adjacents.length);
			return this.aStar(inTile, adjacents[randomIndex]);
		}
		return this.aStar(inTile, furthestTile);
	}

	public findPathAwayFromPacmanAvoidingGhosts(
		mrPacman: MrPacman,
		inTile: Tile,
		ghostTiles: Tile[]
	): Tile[] {
		const pacmanTile = mrPacman.inTile;
		const furthestTile = this.board.getFurthestTileFrom(pacmanTile);

		const path = this.aStar(inTile, furthestTile);

		// Check if the path intersects with any ghost tiles
		for (let tile of path) {
			if (ghostTiles.includes(tile)) {
				// If it does, find an alternative path
				const alternativePaths = this.board.getAllTiles().filter((t) => !ghostTiles.includes(t));
				for (let altTile of alternativePaths) {
					const altPath = this.aStar(inTile, altTile);
					if (!altPath.some((t) => ghostTiles.includes(t))) {
						return altPath;
					}
				}
			}
		}

		return path;
	}

	public findPathAwayFromPacmanAvoidingGhostPaths(
		mrPacman: MrPacman,
		inTile: Tile,
		ghostPaths: Tile[][]
	): Tile[] {
		const pacmanTile = mrPacman.inTile;
		const furthestTile = this.board.getFurthestTileFrom(pacmanTile);

		const path = this.aStar(inTile, furthestTile);

		// Check if the path intersects with any ghost paths
		for (let tile of path) {
			for (let ghostPath of ghostPaths) {
				if (ghostPath.includes(tile)) {
					// If it does, find an alternative path
					const alternativePaths = this.board
						.getAllTiles()
						.filter((t) => !ghostPaths.some((gp) => gp.includes(t)));
					for (let altTile of alternativePaths) {
						const altPath = this.aStar(inTile, altTile);
						if (!altPath.some((t) => ghostPaths.some((gp) => gp.includes(t)))) {
							return altPath;
						}
					}
				}
			}
		}
		return path;
	}

	public findPathAwayFromPacmanAvoidingGhostPathsAndGhosts(
		mrPacman: MrPacman,
		inTile: Tile,
		ghostPaths: Tile[][],
		ghostTiles: Tile[]
	): Tile[] {
		const pacmanTile = mrPacman.inTile;
		const furthestTile = this.board.getFurthestTileFrom(pacmanTile);

		const path = this.aStar(inTile, furthestTile);

		// Check if the path intersects with any ghost paths
		for (let tile of path) {
			for (let ghostPath of ghostPaths) {
				if (ghostPath.includes(tile)) {
					// If it does, find an alternative path
					const alternativePaths = this.board
						.getAllTiles()
						.filter((t) => !ghostPaths.some((gp) => gp.includes(t)) && !ghostTiles.includes(t));
					for (let altTile of alternativePaths) {
						const altPath = this.aStar(inTile, altTile);
						if (
							!altPath.some(
								(t) => ghostPaths.some((gp) => gp.includes(t)) || ghostTiles.includes(t)
							)
						) {
							return altPath;
						}
					}
				}
			}
		}
		return path;
	}

	public findPathAwayFromPacmanInRadiusAvoidingGhostsAndPaths(
		mrPacman: MrPacman,
		inTile: Tile,
		ghostPaths: Tile[][],
		ghostTiles: Tile[],
		radius: number = 5
	): Tile[] {
		const pacmanTile = mrPacman.inTile;
		const furthestTile = this.board.getFurthestTileFrom(pacmanTile);

		const path = this.aStar(inTile, furthestTile);

		// Check if the path intersects with any ghost paths or is within the radius
		for (let tile of path) {
			const distanceFromPacman = this.heuristic(tile, pacmanTile);
			if (distanceFromPacman <= radius) {
				for (let ghostPath of ghostPaths) {
					if (ghostPath.includes(tile) || ghostTiles.includes(tile)) {
						// If it does, find an alternative path
						const alternativePaths = this.board
							.getAllTiles()
							.filter(
								(t) =>
									!ghostPaths.some((gp) => gp.includes(t)) &&
									!ghostTiles.includes(t) &&
									this.heuristic(t, pacmanTile) > radius
							);
						for (let altTile of alternativePaths) {
							const altPath = this.aStar(inTile, altTile);
							if (
								!altPath.some(
									(t) => ghostPaths.some((gp) => gp.includes(t)) || ghostTiles.includes(t)
								)
							) {
								return altPath;
							}
						}
					}
				}
			}
		}
		return path;
	}

	public findUniquePathAwayFromPacman(
		mrPacman: MrPacman,
		inTile: Tile,
		otherPaths: Tile[][]
	): Tile[] {
		const pacmanTile = mrPacman.inTile;
		let otherDestionations = otherPaths.map((p) => {
			if (p.length === 0) return this.board.getFurthestTileFrom(pacmanTile);
			return p[p.length - 1];
		});
		const furthestTile = this.board.getFurthestTileFromDifferentDestinations(
			pacmanTile,
			otherDestionations
		);

		const path = this.aStar(inTile, furthestTile);

		// Check if the path is unique compared to other paths
		for (let otherPath of otherPaths) {
			if (this.pathsAreEqual(path, otherPath)) {
				// If it is not unique, find an alternative path
				const alternativePaths = this.board
					.getAllTiles()
					.filter((t) => !otherPaths.some((op) => op.includes(t)));
				for (let altTile of alternativePaths) {
					const altPath = this.aStar(inTile, altTile);
					if (!otherPaths.some((op) => this.pathsAreEqual(altPath, op))) {
						return altPath;
					}
				}
			}
		}
		return path;
	}

	private pathsAreEqual(path1: Tile[], path2: Tile[]): boolean {
		if (path1.length !== path2.length) return false;
		for (let i = 0; i < path1.length; i++) {
			if (path1[i] !== path2[i]) return false;
		}
		return true;
	}

	public findRandomPathAwayFromPacman(
		mrPacman: MrPacman,
		inTile: Tile,
		distance: number = 3
	): Tile[] {
		const pacmanTile = mrPacman.inTile;
		const allTiles = this.board.getAllTiles();
		const validTiles = allTiles.filter((tile) => this.heuristic(tile, pacmanTile) >= distance);

		if (validTiles.length === 0) {
			return [];
		}

		const randomTile = validTiles[Math.floor(Math.random() * validTiles.length)];
		return this.aStar(inTile, randomTile);
	}

	public findNextTileForGhost(mrPacman: MrPacman, inTile: Tile, ghostTiles: Tile[]): Tile {
		const pacmanTile = mrPacman.inTile;
		const neighbors = this.getNeighbors(inTile);
		const validNeighbors = neighbors.filter(
			(tile) =>
				!ghostTiles.includes(tile) &&
				this.heuristic(tile, pacmanTile) > this.heuristic(inTile, pacmanTile)
		);

		if (validNeighbors.length > 0) {
			return validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
		}

		// If no valid neighbors found, choose any neighbor that is not occupied by another ghost
		const alternativeNeighbors = neighbors.filter((tile) => !ghostTiles.includes(tile));
		if (alternativeNeighbors.length > 0) {
			return alternativeNeighbors[Math.floor(Math.random() * alternativeNeighbors.length)];
		}

		// If all neighbors are occupied, go backwards
		return neighbors[Math.floor(Math.random() * neighbors.length)];
	}

	public findPathAwayFromPacmanWithDynamicStart(
		mrPacman: MrPacman,
		inTile: Tile,
		ghostTiles: Tile[]
	): { path: Tile[]; furthestTile: Tile } {
		const pacmanTile = mrPacman.inTile;
		let furthestTile = this.board.getFurthestTileFrom(pacmanTile);
		let path = this.aStar(inTile, furthestTile);

		// If the first tile of the path is occupied by another ghost, find a new starting tile
		if (ghostTiles.includes(path[0])) {
			const alternativeStarts = this.getNeighbors(inTile).filter(
				(tile) => !ghostTiles.includes(tile)
			);
			for (let altStart of alternativeStarts) {
				path = this.aStar(altStart, furthestTile);
				if (!ghostTiles.includes(path[0])) {
					break;
				}
			}
		}

		// If the next tile is the ghost's furthest tile, find a new further tile in the opposite direction
		if (path.length > 1 && path[1] === furthestTile) {
			const oppositeTile = this.board.getOppositeTile(furthestTile);
			furthestTile = this.board.getFurthestTileFrom(oppositeTile);
			path = this.aStar(inTile, furthestTile);
		}

		return { path, furthestTile };
	}
}
