import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExportImagePlugin(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ExportImagePlugin } = await import("./ExportImagePlugin.js");

        e.addPlugin(new ExportImagePlugin());
    });
}
