import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadEasingBouncePlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { easingsFunctions } = await import("./easingsFunctions.js");

    for (const [easing, easingFn] of easingsFunctions) {
      e.pluginManager.addEasing(easing, easingFn);
    }
  });
}
