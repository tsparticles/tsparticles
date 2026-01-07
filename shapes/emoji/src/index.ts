import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadEmojiShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { EmojiDrawer } = await import("./EmojiDrawer.js");

        e.addShape(new EmojiDrawer());
    });
}
