import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExportImagePlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ExportImagePlugin } = await import("./ExportImagePlugin.js");

        e.addPlugin(new ExportImagePlugin());
    });
}
