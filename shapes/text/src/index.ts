import type { Engine } from "@tsparticles/engine";
import { validTypes } from "./TextDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTextShape(engine: Engine, refresh = true): Promise<void> {
    const { TextDrawer } = await import("./TextDrawer.js");

    await engine.addShape(validTypes, new TextDrawer(), refresh);
}
