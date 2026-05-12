import { type Engine } from "@tsparticles/engine";
import { easingsFunctions } from "./easingsFunctions.js";

declare const __VERSION__: string;

/**
 * Loads the easing linear plugin for tsParticles
 * @param engine
 */
export async function loadEasingLinearPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    for (const [easing, easingFn] of easingsFunctions) {
      e.pluginManager.addEasing(easing, easingFn);
    }
  });
}
