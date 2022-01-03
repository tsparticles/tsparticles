import type { Engine } from "tsparticles";
import { BubbleDrawer } from "./BubbleDrawer";

export function loadBubbleShape(tsParticles: Engine): void {
    tsParticles.addShape("bubble", new BubbleDrawer());
}
