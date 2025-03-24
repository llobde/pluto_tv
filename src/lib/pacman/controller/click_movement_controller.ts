import { Tile, type PacmanBoard } from '../scene/board';
import { GenericAl } from './ai_alghorithms';
import { MovementController } from './movement_controller';

export class ClickMovementController extends MovementController {
	inPath: Tile[] = [];
	al: GenericAl;
	constructor(board: PacmanBoard, startTile: Tile) {
		super(board, startTile);
		this.al = new GenericAl(board);
		this.startEventListeners();
	}

	newClickPosition(position: { x: number; y: number }) {
		let targetTile = this.board.getTileFromPixel(position);
		if (!targetTile) return;
		this.inPath = this.al.getPath(this.inTile, targetTile);
        console.log('Path', this.inPath);
		// this.setTargetTile(targetTile);
	}

    moveWithDelta(delta: number, currentPosition: {x: number, y : number}): { x: number; y: number } {
        if (this.inPath.length === 0) {
            return this.inTile.getPositionInPixels();
        }

        let nextTile = this.inPath[0];
        let targetPosition = nextTile.getPositionInPixels();

        let direction = {
            x: targetPosition.x - currentPosition.x,
            y: targetPosition.y - currentPosition.y
        };

        let distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        let moveDistance = delta * this.speed;

        if (moveDistance >= distance) {
            this.inTile = nextTile;
            this.inPath.shift();
            return this.inTile.getPositionInPixels();
        } else {
            return {
                x: currentPosition.x + (direction.x / distance) * moveDistance,
                y: currentPosition.y + (direction.y / distance) * moveDistance
            };
        }
    }
}
