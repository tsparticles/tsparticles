import type { Engine } from "@tsparticles/engine";
import { validTypes } from "./Constants.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEmojiShape(engine: Engine, refresh = true): Promise<void> {
    const { EmojiDrawer } = await import("./EmojiDrawer.js");

    await engine.addShape(validTypes, new EmojiDrawer(), refresh);
}
