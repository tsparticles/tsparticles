import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * Loads the GIF shape in the given engine
 * @param engine - the engine where the GIF shape is going to be added
 */
export async function loadGifShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { GifDrawer } = await import("./GifDrawer.js");

    e.pluginManager.addShape(["gif", "gifs"], container => Promise.resolve(new GifDrawer(container)));
  });
}
