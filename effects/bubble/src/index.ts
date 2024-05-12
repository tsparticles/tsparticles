import { BubbleDrawer } from "./BubbleDrawer.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBubbleEffect(engine: Engine, refresh = true): Promise<void> {
    await engine.addEffect("bubble", new BubbleDrawer(), refresh);
}
