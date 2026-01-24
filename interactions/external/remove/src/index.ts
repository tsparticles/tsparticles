import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalRemoveInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

    await loadInteractivityPlugin(e);

    e.addInteractor?.("externalRemove", async container => {
      const { Remover } = await import("./Remover.js");

      return new Remover(container);
    });
  });
}

export * from "./Options/Classes/Remove.js";
export type * from "./Options/Interfaces/IRemove.js";
