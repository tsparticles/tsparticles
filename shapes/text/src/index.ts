import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { TextDrawer } from "./TextDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTextShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new TextDrawer(), refresh);
}
