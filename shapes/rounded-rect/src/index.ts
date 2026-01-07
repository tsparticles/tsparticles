import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadRoundedRectShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { RoundedRectDrawer } = await import("./RoundedRectDrawer.js");

        e.addShape(new RoundedRectDrawer());
    });
}
