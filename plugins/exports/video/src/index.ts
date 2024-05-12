import type { Engine } from "@tsparticles/engine";
import { ExportVideoPlugin } from "./ExportVideoPlugin.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportVideoPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new ExportVideoPlugin(engine), refresh);
}
