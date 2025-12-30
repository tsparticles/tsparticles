import { type Engine } from "@tsparticles/engine";
import { ExportVideoPlugin } from "./ExportVideoPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportVideoPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new ExportVideoPlugin(), refresh);
}
