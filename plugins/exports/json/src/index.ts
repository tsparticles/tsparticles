import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ExportJSONPlugin } from "./ExportJSONPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportJSONPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPlugin(new ExportJSONPlugin(engine), refresh);
}
