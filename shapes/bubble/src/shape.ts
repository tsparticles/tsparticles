import type { Engine } from "tsparticles";
import { BubbleDrawer } from "./BubbleDrawer";

export function loadBubbleShape(engine: Engine): void {
    engine.addShape("bubble", new BubbleDrawer());
}
