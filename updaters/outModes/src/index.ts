import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance loading this plugin
 */
export function loadOutModesUpdater(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addParticleUpdater("outModes", async container => {
            const { OutOfCanvasUpdater } = await import("./OutOfCanvasUpdater.js");

            return new OutOfCanvasUpdater(container);
        });
    });
}
