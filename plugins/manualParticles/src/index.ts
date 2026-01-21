import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadManualParticlesPlugin(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ManualParticlesPlugin } = await import("./ManualParticlesPlugin.js");

        e.addPlugin(new ManualParticlesPlugin());
    });
}
