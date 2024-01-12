import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadEmojiShape(engine: Engine, refresh = true): Promise<void> {
    const { EmojiDrawer, validTypes } = await import("./EmojiDrawer.js");

    await engine.addShape(validTypes, new EmojiDrawer(), refresh);
}
