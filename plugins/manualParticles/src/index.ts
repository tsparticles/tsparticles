import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export function loadManualParticlesPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ManualParticlesPlugin } = await import("./ManualParticlesPlugin.js");

        e.addPlugin(new ManualParticlesPlugin());
    });
}
