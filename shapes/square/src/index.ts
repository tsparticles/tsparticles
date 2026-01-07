import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadSquareShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { SquareDrawer } = await import("./SquareDrawer.js");

        e.addShape(new SquareDrawer());
    });
}
