import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ExportImagePlugin } from "./ExportImagePlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportImagePlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPlugin(new ExportImagePlugin(engine), refresh);
}
