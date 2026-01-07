import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the updater for
 */
export function loadTiltUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("tilt", async container => {
            const { TiltUpdater } = await import("./TiltUpdater.js");

            return new TiltUpdater(container);
        });
    });
}
