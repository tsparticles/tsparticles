import type { Engine } from "@tsparticles/engine";
import { ExportJSONPlugin } from "./ExportJSONPlugin.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportJSONPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new ExportJSONPlugin(engine), refresh);
}
