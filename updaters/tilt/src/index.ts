import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the updater for
 */
export async function loadTiltUpdater(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(e => {
        e.addParticleUpdater("tilt", async container => {
            const { TiltUpdater } = await import("./TiltUpdater.js");

            return new TiltUpdater(container);
        });
    });
}
