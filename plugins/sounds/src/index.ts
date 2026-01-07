import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadSoundsPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { SoundsPlugin } = await import("./SoundsPlugin.js");

        e.addPlugin(new SoundsPlugin(engine));
    });
}
