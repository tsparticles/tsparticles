import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Bouncer } from "./Bouncer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the external bounce interaction plugin
 * @param engine - The engine instance to register the plugin with
 */
export async function loadExternalBounceInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalBounce", container => {
      return Promise.resolve(new Bouncer(container));
    });
  });
}

export * from "./Options/Classes/Bounce.js";
export type * from "./Options/Interfaces/IBounce.js";
