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
        const furthestTile = this.board.getFurthestTileFrom(pacmanTile);
        return this.aStar(inTile, furthestTile);
    }
}
