import { ColorTransitionsUpdater } from "./ColorTransitionsUpdater.js";
import type { Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the updater in
 */
export async function loadColorTransitionsUpdater(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addParticleUpdater("colorTransitions", container => {
      return Promise.resolve(new ColorTransitionsUpdater(e.pluginManager, container));
    });
  });
}

export * from "./Options/Classes/ColorTransitionStop.js";
export * from "./Options/Classes/ColorTransitions.js";
export * from "./Options/Classes/LifetimeColorTransitions.js";
export type * from "./Options/Interfaces/IColorTransitions.js";
export type * from "./Types.js";
export * from "./Utils.js";
