import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { BubbleDrawer } from "./BubbleDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBubbleEffect(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addEffect("bubble", new BubbleDrawer(), refresh);
}
