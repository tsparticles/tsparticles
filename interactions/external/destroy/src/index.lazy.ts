import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * Registers the destroy external interaction in the given engine.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalDestroyInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalDestroy", async container => {
      const { Destroyer } = await import("./Destroyer.js");

      return new Destroyer(container);
    });
  });
}

export * from "./Options/Classes/Destroy.js";
export type * from "./Options/Interfaces/IDestroy.js";
