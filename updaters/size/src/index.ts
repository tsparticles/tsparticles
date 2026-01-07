import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadSizeUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("size", async () => {
            const { SizeUpdater } = await import("./SizeUpdater.js");

            return new SizeUpdater();
        });
    });
}
