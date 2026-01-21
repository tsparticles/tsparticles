import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadHeartsCardsShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { HeartDrawer } = await import("./HeartDrawer.js");

        e.addShape(new HeartDrawer());
    });
}
