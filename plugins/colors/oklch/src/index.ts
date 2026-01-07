import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklch color plugin
 * @param engine - The engine, used to add the color manager
 */
export function loadOklchColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { OklchColorManager } = await import("./OklchColorManager.js");

        e.addColorManager(new OklchColorManager());
    });
}
