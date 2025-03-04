import * as PIXI from 'pixi.js';
import type { PacmanBoard } from './board';
import { Dot } from '../elements/dot';
export class Dots {
    app: PIXI.Application;
    board: PacmanBoard;
    dots: Dot[];
    constructor(app: PIXI.Application, board: PacmanBoard) {
        this.app = app;
        this.board = board;
        this.dots = [];
    }
    init() {
        const dotsPositions = this.board.dotsInitialPositions;
        for (let pos of dotsPositions) {
            const dot = new Dot(this.app, this.board, pos.x, pos.y);
            this.dots.push(dot);
        }
    }
}