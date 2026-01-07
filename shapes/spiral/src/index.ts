import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadSpiralShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { SpiralDrawer } = await import("./SpiralDrawer.js");

        e.addShape(new SpiralDrawer());
    });
}
