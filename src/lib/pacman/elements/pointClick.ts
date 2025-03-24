import * as PIXI from 'pixi.js';

export class FadingCircle extends PIXI.Graphics {
    constructor(x: number, y: number, radius: number, color: number) {
        super();
        this.circle(0, 0, radius);
        this.fill(color);
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.zIndex = 200;
        this.fadeOut();
    }

    fadeOut() {
        const fadeDuration = 1000; // 1 second
        const fadeStep = 0.01;
        const fadeInterval = fadeDuration / (1 / fadeStep);

        const fade = setInterval(() => {
            this.alpha -= fadeStep;
            if (this.alpha <= 0) {
                this.alpha = 0;
                clearInterval(fade);
            }
        }, fadeInterval);
    }
}
