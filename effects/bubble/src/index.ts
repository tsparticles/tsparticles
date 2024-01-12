import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBubbleEffect(engine: Engine, refresh = true): Promise<void> {
    const { BubbleDrawer } = await import("./BubbleDrawer.js");

    await engine.addEffect("bubble", new BubbleDrawer(), refresh);
}
