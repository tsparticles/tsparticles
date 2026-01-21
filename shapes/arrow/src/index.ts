import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadArrowShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ArrowDrawer } = await import("./ArrowDrawer.js");

        e.addShape(new ArrowDrawer());
    });
}
