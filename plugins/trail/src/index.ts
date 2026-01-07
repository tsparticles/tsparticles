import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export function loadTrailPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { TrailPlugin } = await import("./TrailPlugin.js");

        e.addPlugin(new TrailPlugin(engine));
    });
}
