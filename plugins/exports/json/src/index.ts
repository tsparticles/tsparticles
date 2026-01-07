import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExportJSONPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ExportJSONPlugin } = await import("./ExportJSONPlugin.js");

        e.addPlugin(new ExportJSONPlugin());
    });
}
