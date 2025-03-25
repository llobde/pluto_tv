import { Tile, type PacmanBoard } from '../scene/board';
import { GenericAl } from './ai_alghorithms';
import { MovementController } from './movement_controller';

export class JoyMovementController extends MovementController {
    gamePad: Gamepad | null = null;
    constructor(board: PacmanBoard, startTile: Tile) {
        super(board, startTile);
        let gamePads = navigator.getGamepads();
        for (const pad of gamePads) {
            if (pad) {
                this.gamePad = pad;
            }

        }
        console.log(this.gamePad);
    }

    get buttons() {
        return this.gamePad?.buttons;
    }

    get axes() {
        return this.gamePad?.axes;
    }

}