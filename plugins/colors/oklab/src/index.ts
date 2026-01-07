import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the Oklab color plugin
 * @param engine - The engine, used to add the color manager
 */
export function loadOklabColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { OklabColorManager } = await import("./OklabColorManager.js");

        e.addColorManager(new OklabColorManager());
    });
}
