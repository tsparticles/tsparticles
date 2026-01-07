import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadColorUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("color", async container => {
            const { ColorUpdater } = await import("./ColorUpdater.js");

            return new ColorUpdater(e, container);
        });
    });
}
