import type { Engine } from "tsparticles";
import { MultilineTextDrawer } from "./MultilineTextDrawer";

export function loadMultilineTextShape(tsParticles: Engine): void {
    tsParticles.addShape("multiline-text", new MultilineTextDrawer());
}
