import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadTwinkleUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("twinkle", async () => {
            const { TwinkleUpdater } = await import("./TwinkleUpdater.js");

            return new TwinkleUpdater(e);
        });
    });
}
