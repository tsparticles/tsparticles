import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance to load the updater for
 */
export function loadOpacityUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("opacity", async container => {
            const { OpacityUpdater } = await import("./OpacityUpdater.js");

            return new OpacityUpdater(container);
        });
    });
}
