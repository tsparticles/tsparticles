import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadOrbitUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("orbit", async container => {
            const { OrbitUpdater } = await import("./OrbitUpdater.js");

            return new OrbitUpdater(e, container);
        });
    });
}
