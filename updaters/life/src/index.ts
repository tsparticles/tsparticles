import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadLifeUpdater(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(e => {
        e.addParticleUpdater("life", async container => {
            const { LifeUpdater } = await import("./LifeUpdater.js");

            return new LifeUpdater(container);
        });
    });
}
