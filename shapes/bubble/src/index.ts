import { BubbleDrawer } from "./BubbleDrawer";
import type { Engine } from "tsparticles-engine";

export async function loadBubbleShape(engine: Engine): Promise<void> {
    await engine.addShape("bubble", new BubbleDrawer());
}
