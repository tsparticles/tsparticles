import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportImagePlugin(engine: Engine, refresh = true): Promise<void> {
    const { ExportImagePlugin } = await import("./ExportImagePlugin.js");

    await engine.addPlugin(new ExportImagePlugin(engine), refresh);
}
