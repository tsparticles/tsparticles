import { type Engine } from "@tsparticles/engine";
import { ExportImagePlugin } from "./ExportImagePlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportImagePlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new ExportImagePlugin(), refresh);
}
