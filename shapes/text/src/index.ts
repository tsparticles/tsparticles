import type { Engine } from "@tsparticles/engine";
import { TextDrawer } from "./TextDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTextShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new TextDrawer(), refresh);
}
