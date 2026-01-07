import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadDestroyUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("destroy", async container => {
            const { DestroyUpdater } = await import("./DestroyUpdater.js");

            return new DestroyUpdater(e, container);
        });
    });
}
