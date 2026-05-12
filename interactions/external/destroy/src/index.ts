import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Destroyer } from "./Destroyer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Registers the destroy external interaction in the given engine.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalDestroyInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalDestroy", async container => {
      return Promise.resolve(new Destroyer(container));
    });
  });
}

export * from "./Options/Classes/Destroy.js";
export type * from "./Options/Interfaces/IDestroy.js";
