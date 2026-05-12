import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Attractor } from "./Attractor.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the external attract interaction plugin
 * @param engine - The engine instance to register the plugin with
 */
export async function loadExternalAttractInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalAttract", container => {
      return Promise.resolve(new Attractor(e.pluginManager, container));
    });
  });
}

export * from "./Options/Classes/Attract.js";
export type * from "./Options/Interfaces/IAttract.js";
