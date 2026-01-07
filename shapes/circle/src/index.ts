import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadCircleShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { CircleDrawer } = await import("./CircleDrawer.js");

        e.addShape(new CircleDrawer());
    });
}
