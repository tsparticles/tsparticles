import type { Engine } from "@tsparticles/engine";
import { ExportImagePlugin } from "./ExportImagePlugin.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportImagePlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new ExportImagePlugin(engine), refresh);
}
