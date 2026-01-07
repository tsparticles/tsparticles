import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadHeartsCardsShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { HeartDrawer } = await import("./HeartDrawer.js");

        e.addShape(new HeartDrawer());
    });
}
