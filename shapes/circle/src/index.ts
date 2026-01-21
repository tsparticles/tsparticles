import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCircleShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { CircleDrawer } = await import("./CircleDrawer.js");

        e.addShape(new CircleDrawer());
    });
}
