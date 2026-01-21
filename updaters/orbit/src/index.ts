import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadOrbitUpdater(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(e => {
        e.addParticleUpdater("orbit", async container => {
            const { OrbitUpdater } = await import("./OrbitUpdater.js");

            return new OrbitUpdater(e, container);
        });
    });
}
