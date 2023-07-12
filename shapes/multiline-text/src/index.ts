import type { Engine } from "tsparticles-engine";
import { MultilineTextDrawer } from "./MultilineTextDrawer";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadMultilineTextShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("multiline-text", new MultilineTextDrawer(), refresh);
}
