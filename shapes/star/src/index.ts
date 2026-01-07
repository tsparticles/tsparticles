import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadStarShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { StarDrawer } = await import("./StarDrawer.js");

        e.addShape(new StarDrawer());
    });
}
