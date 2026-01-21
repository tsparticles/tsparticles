import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadTextShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { TextDrawer } = await import("./TextDrawer.js");

        e.addShape(new TextDrawer());
    });
}
