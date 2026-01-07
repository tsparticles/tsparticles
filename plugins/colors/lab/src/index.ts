import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * This function is used to load the Lab color plugin
 * @param engine - The engine, used to add the color manager
 */
export function loadLabColorPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { LabColorManager } = await import("./LabColorManager.js");

        e.addColorManager(new LabColorManager());
    });
}
