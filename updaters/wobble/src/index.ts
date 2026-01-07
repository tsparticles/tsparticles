import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadWobbleUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("wobble", async container => {
            const { WobbleUpdater } = await import("./WobbleUpdater.js");

            return new WobbleUpdater(container);
        });
    });
}
