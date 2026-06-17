import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { Slower } from "./Slower.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadExternalSlowInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalSlow", container => {
      return Promise.resolve(new Slower(container));
    });
  });
}

export * from "./Options/Classes/Slow.js";
export type * from "./Options/Interfaces/ISlow.js";
