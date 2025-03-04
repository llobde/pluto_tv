import * as PIXI from 'pixi.js';
export class TexturesLoader {
    static async loadPacman(): Promise<PIXI.Texture[]> {
        let texture = await PIXI.Assets.load('static/favicon.png');
        return texture;
    }
}