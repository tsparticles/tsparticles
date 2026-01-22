import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadBackgroundMaskPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { BackgroundMaskPlugin } = await import("./BackgroundMaskPlugin.js");

    e.addPlugin(new BackgroundMaskPlugin(e));
  });
}
