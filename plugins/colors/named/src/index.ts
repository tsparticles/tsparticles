import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the named color plugin
 * @param engine - The engine, used to add the plugin
 */
export function loadNamedColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { NamedColorManager } = await import("./NamedColorManager.js");

        e.addColorManager(new NamedColorManager());
    });
}
