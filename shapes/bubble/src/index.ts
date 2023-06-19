import { BubbleDrawer } from "./BubbleDrawer";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBubbleShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("bubble", new BubbleDrawer(), refresh);
}
