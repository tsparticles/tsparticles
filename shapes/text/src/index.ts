import { TextDrawer, validTypes } from "./TextDrawer";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTextShape(engine: Engine, refresh = false): Promise<void> {
    await engine.addShape(validTypes, new TextDrawer(), refresh);
}
