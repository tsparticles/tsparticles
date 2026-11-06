import type { Engine } from "@tsparticles/engine";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance loading this plugin
 */
export async function loadOutModesUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("outModes", container => {
      return Promise.resolve(new OutOfCanvasUpdater(container));
    });
  });
}
