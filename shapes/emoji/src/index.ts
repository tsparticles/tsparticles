import { EmojiDrawer } from "./EmojiDrawer.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEmojiShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new EmojiDrawer(), refresh);
}
