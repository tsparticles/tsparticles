import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportJSONPlugin(engine: Engine, refresh = true): Promise<void> {
    const { ExportJSONPlugin } = await import("./ExportJSONPlugin.js");

    await engine.addPlugin(new ExportJSONPlugin(engine), refresh);
}
