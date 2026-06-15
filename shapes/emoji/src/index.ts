import { EmojiDrawer } from "./EmojiDrawer.js";
import { type Engine } from "@tsparticles/engine";
import { validTypes } from "./Utils.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadEmojiShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(validTypes, () => Promise.resolve(new EmojiDrawer()));
  });
}
