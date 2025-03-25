export class GamePadController {
    gamepads: { [key: string]: GamepadEvent } = {};
    constructor() {
        window.addEventListener('gamepadconnected', (e) => {
            console.log(
                'Gamepad connected at index %d: %s. %d buttons, %d axes.',
                e.gamepad.index,
                e.gamepad.id,
                e.gamepad.buttons.length,
                e.gamepad.axes.length
            );
        });
        window.addEventListener('gamepaddisconnected', (e) => {
            console.log('Gamepad disconnected from index %d: %s', e.gamepad.index, e.gamepad.id);
        });
    }

    gamepadHandler(event: any, connected: true) {
        const gamepad: any = event.gamepad;
        // Note:
        // gamepad === navigator.getGamepads()[gamepad.index]

        if (connected) {
            this.gamepads[gamepad.index] = gamepad;
        } else {
            delete this.gamepads[gamepad.index];
        }
    }
}