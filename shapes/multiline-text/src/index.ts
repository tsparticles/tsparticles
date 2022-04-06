import type { Engine } from "tsparticles-engine";
import { MultilineTextDrawer } from "./MultilineTextDrawer";

export function loadMultilineTextShape(engine: Engine): void {
    engine.addShape("multiline-text", new MultilineTextDrawer());
}
