import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSoundsPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { SoundsPlugin } = await import("./SoundsPlugin.js");

    e.addPlugin(new SoundsPlugin(engine));
  });
}
