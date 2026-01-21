import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadRollUpdater(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(e => {
        e.addParticleUpdater("roll", async () => {
            const { RollUpdater } = await import("./RollUpdater.js");

            return new RollUpdater(e);
        });
    });
}
