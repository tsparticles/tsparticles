import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCanvasMaskPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { CanvasMaskPlugin } = await import("./CanvasMaskPlugin.js");

    e.pluginManager.addPlugin(new CanvasMaskPlugin());
  });
}
