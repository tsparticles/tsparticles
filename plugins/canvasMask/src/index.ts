import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCanvasMaskPlugin(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { CanvasMaskPlugin } = await import("./CanvasMaskPlugin.js");

        e.addPlugin(new CanvasMaskPlugin());
    });
}
