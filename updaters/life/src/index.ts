import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadLifeUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("life", async container => {
            const { LifeUpdater } = await import("./LifeUpdater.js");

            return new LifeUpdater(container);
        });
    });
}
