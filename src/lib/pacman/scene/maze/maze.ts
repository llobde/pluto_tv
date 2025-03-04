import * as PIXI from 'pixi.js';

export function generatePacmanMap(width: number, height: number): string {
    const map = [];
    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
                row += '#'; // Wall
            } else if (Math.random() < 0.1) {
                row += '#'; // Random wall
            } else {
                row += '.'; // Pellet
            }
        }
        map.push(row);
    }
    return map.join('\n');
}

export class PacmanMaze {
    private mazeString: string;
    private cellSize: number;
    private mazeContainer: PIXI.Container;

    constructor(mazeString: string, cellSize: number = 32) {
        this.mazeString = mazeString;
        this.cellSize = cellSize;
        this.mazeContainer = new PIXI.Container();
        this.createMaze();
    }

    private createMaze() {
        const rows = this.mazeString.split('\n');
        for (let y = 0; y < rows.length; y++) {
            const row = rows[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                const position = new PIXI.Point(x * this.cellSize, y * this.cellSize);
                this.createCell(cell, position);
            }
        }
    }

    private createCell(cell: string, position: PIXI.Point) {
        let sprite: PIXI.Sprite;
        switch (cell) {
            case '#':
                sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
                sprite.tint = 0x0000ff; // Wall color
                break;
            case '.':
                sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
                sprite.tint = 0xffff00; // Pellet color
                break;
            case ' ':
                return; // Empty space
            default:
                return; // Unknown character
        }
        sprite.width = this.cellSize;
        sprite.height = this.cellSize;
        sprite.position = position;
        this.mazeContainer.addChild(sprite);
    }

    public getContainer(): PIXI.Container {
        return this.mazeContainer;
    }
}