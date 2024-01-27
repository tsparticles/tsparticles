import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportVideoPlugin(engine: Engine, refresh = true): Promise<void> {
    const { ExportVideoPlugin } = await import("./ExportVideoPlugin.js");

    await engine.addPlugin(new ExportVideoPlugin(engine), refresh);
}
