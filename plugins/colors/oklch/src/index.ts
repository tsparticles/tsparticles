import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklch color plugin
 * @param engine - The engine, used to add the color manager
 */
export async function loadOklchColorPlugin(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { OklchColorManager } = await import("./OklchColorManager.js");

        e.addColorManager(new OklchColorManager());
    });
}
