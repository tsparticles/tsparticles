import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { CanvasMaskPlugin } from "./CanvasMaskPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCanvasMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPlugin(new CanvasMaskPlugin(), refresh);
}
