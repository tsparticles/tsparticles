import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadTwinkleUpdater(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(e => {
        e.addParticleUpdater("twinkle", async () => {
            const { TwinkleUpdater } = await import("./TwinkleUpdater.js");

            return new TwinkleUpdater(e);
        });
    });
}
