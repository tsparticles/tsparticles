import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExportVideoPlugin(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ExportVideoPlugin } = await import("./ExportVideoPlugin.js");

        e.addPlugin(new ExportVideoPlugin());
    });
}
