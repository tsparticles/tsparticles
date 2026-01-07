import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export function loadBackgroundMaskPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { BackgroundMaskPlugin } = await import("./BackgroundMaskPlugin.js");

        e.addPlugin(new BackgroundMaskPlugin(e));
    });
}
