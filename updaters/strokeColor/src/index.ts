import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadStrokeColorUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("strokeColor", async container => {
            const { StrokeColorUpdater } = await import("./StrokeColorUpdater.js");

            return new StrokeColorUpdater(e, container);
        });
    });
}
