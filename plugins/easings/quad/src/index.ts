import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadEasingQuadPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { easingsFunctions } = await import("./easingsFunctions.js");

    for (const [easing, easingFn] of easingsFunctions) {
      e.addEasing(easing, easingFn);
    }
  });
}
