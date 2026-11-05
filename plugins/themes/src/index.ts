import type { Engine } from "@tsparticles/engine";
import { ThemesPlugin } from "./ThemesPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadThemesPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new ThemesPlugin());
  });
}
