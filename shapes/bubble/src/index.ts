import { Main } from "tsparticles-engine";
import { BubbleDrawer } from "./BubbleDrawer";

export function loadBubbleShape(tsParticles: Main): void {
    tsParticles.addShape("bubble", new BubbleDrawer());
}
