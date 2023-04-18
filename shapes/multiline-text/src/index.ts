import type { Engine } from "tsparticles-engine";
import { MultilineTextDrawer } from "./MultilineTextDrawer";

/**
 *
 * @param engine -
 */
export async function loadMultilineTextShape(engine: Engine): Promise<void> {
    await engine.addShape("multiline-text", new MultilineTextDrawer());
}
