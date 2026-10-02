import { type Engine, addErrorMessages } from "@tsparticles/engine";
import { ErrorMessages } from "./ErrorMessages.js";
import { GifDrawer } from "./GifDrawer.js";

declare const __VERSION__: string,
  process:
    | {
        env: {
          NODE_ENV?: string;
        };
      }
    | undefined;

/**
 * Loads the GIF shape in the given engine
 * @param engine - the engine where the GIF shape is going to be added
 */
export async function loadGifShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["gif", "gifs"], container => Promise.resolve(new GifDrawer(container)));
  });
}
