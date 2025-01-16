import { BubbleDrawer } from "./BubbleDrawer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBubbleEffect(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addEffect("bubble", new BubbleDrawer(), refresh);
}
