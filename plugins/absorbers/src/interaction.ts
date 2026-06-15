import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import { AbsorbersInteractor } from "./AbsorbersInteractor.js";
import { type Engine } from "@tsparticles/engine";
import { getAbsorbersInstancesManager } from "./getAbsorbersInstancesManager.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAbsorbersInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const pluginManager = e.pluginManager,
      instancesManager = await getAbsorbersInstancesManager(e);

    ensureInteractivityPluginLoaded(e);

    pluginManager.addInteractor?.("externalAbsorbers", container => {
      return Promise.resolve(new AbsorbersInteractor(container as AbsorberContainer, instancesManager));
    });
  });
}

export type * from "./AbsorberContainer.js";
