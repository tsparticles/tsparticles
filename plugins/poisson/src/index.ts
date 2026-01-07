import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to add the plugin to
 */
export function loadPoissonDiscPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { PoissonDiscPlugin } = await import("./PoissonDiscPlugin.js");

        e.addPlugin(new PoissonDiscPlugin());
    });
}
