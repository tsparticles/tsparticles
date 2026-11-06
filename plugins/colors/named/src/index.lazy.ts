import type { Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * This function is used to load the named color plugin lazily
 * @param engine - The engine, used to add the plugin
 */
export async function loadNamedColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { NamedColorManager } = await import("./NamedColorManager.js");

    e.pluginManager.addColorManager("named", new NamedColorManager());
  });
}
