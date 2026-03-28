import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to add the plugin to
 */
export async function loadPoissonDiscPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { PoissonDiscPlugin } = await import("./PoissonDiscPlugin.js");

    e.pluginManager.addPlugin(new PoissonDiscPlugin());
  });
}
