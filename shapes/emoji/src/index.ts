import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadEmojiShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { EmojiDrawer } = await import("./EmojiDrawer.js");

        e.addShape(new EmojiDrawer());
    });
}
