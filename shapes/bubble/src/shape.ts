import type { Main } from "tsparticles";
import { BubbleDrawer } from "./BubbleDrawer";

export function loadBubbleShape(tsParticles: Main): void {
    tsParticles.addShape("bubble", new BubbleDrawer());
}
