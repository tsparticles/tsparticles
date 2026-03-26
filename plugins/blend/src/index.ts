import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadBlendPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { BlendPlugin } = await import("./BlendPlugin.js");

    e.pluginManager.addPlugin(new BlendPlugin());
  });
}
