import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExportVideoPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ExportVideoPlugin } = await import("./ExportVideoPlugin.js");

        e.addPlugin(new ExportVideoPlugin());
    });
}
