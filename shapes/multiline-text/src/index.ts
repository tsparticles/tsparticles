import type { Engine } from "@tsparticles/engine";
import { MultilineTextDrawer } from "./MultilineTextDrawer";

/**
 *
 * @param engine
 */
export function loadMultilineTextShape(engine: Engine): void {
    engine.addShape("multiline-text", new MultilineTextDrawer());
}
