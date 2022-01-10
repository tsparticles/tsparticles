import type { Engine } from "tsparticles-engine";
import { BubbleDrawer } from "./BubbleDrawer";

export async function loadBubbleShape(engine: Engine): Promise<void> {
    await engine.addShape("bubble", new BubbleDrawer());
}
