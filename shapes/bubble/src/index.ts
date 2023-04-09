import { BubbleDrawer } from "./BubbleDrawer";
import type { Engine } from "tsparticles-engine";

/**
 *
 * @param engine
 */
export async function loadBubbleShape(engine: Engine): Promise<void> {
    await engine.addShape("bubble", new BubbleDrawer());
}
