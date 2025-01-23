import { CanvasMaskPlugin } from "./CanvasMaskPlugin.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCanvasMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new CanvasMaskPlugin(), refresh);
}
