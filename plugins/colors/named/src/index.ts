import type { Engine } from "@tsparticles/engine";
import { NamedColorManager } from "./NamedColorManager.js";

declare const __VERSION__: string;

/**
 * This function is used to load the named color plugin
 * @param engine - The engine, used to add the plugin
 */
export async function loadNamedColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addColorManager("named", new NamedColorManager());
  });
}
