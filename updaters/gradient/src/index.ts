import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadGradientUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("gradient", async () => {
            const { GradientUpdater } = await import("./GradientUpdater.js");

            return new GradientUpdater(e);
        });
    });
}
