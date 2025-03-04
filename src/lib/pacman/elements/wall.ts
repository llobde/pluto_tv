import * as PIXI from 'pixi.js';

export class Wall {
    private graphics: PIXI.Graphics;

    constructor(x: number, y: number, width: number, height: number) {
        this.graphics = new PIXI.Graphics();
        this.graphics.rect(x, y, width, height);
        this.graphics.fill(0x0000ff); // Blue color for the wall
    }

    public getGraphics(): PIXI.Graphics {
        return this.graphics;
    }
}