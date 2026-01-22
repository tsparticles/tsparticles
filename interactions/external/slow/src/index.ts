import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalSlowInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

    await loadInteractivityPlugin(e);

    e.addInteractor?.("externalSlow", async container => {
      const { Slower } = await import("./Slower.js");

      return new Slower(container);
    });
  });
}

export * from "./Options/Classes/Slow.js";
export type * from "./Options/Interfaces/ISlow.js";
