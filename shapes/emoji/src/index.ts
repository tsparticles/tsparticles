import { type Engine } from "@tsparticles/engine";
import { validTypes } from "./Utils.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadEmojiShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(validTypes, async () => {
      const { EmojiDrawer } = await import("./EmojiDrawer.js");

      return new EmojiDrawer();
    });
  });
}
