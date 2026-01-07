import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadArrowShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ArrowDrawer } = await import("./ArrowDrawer.js");

        e.addShape(new ArrowDrawer());
    });
}
