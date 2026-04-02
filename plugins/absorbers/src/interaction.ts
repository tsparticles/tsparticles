import type { AbsorberContainer } from "./AbsorberContainer.js";
import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadAbsorbersInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const [
        { ensureInteractivityPluginLoaded },
        { getAbsorbersInstancesManager },
      ] = await Promise.all([
        import("@tsparticles/plugin-interactivity"),
        import("./getAbsorbersInstancesManager.js"),
      ]),
      pluginManager = e.pluginManager,
      instancesManager = await getAbsorbersInstancesManager(e);

    ensureInteractivityPluginLoaded(e);

    pluginManager.addInteractor?.("externalAbsorbers", async container => {
      const { AbsorbersInteractor } = await import("./AbsorbersInteractor.js");

      return new AbsorbersInteractor(container as AbsorberContainer, instancesManager);
    });
  });
}

export type * from "./AbsorberContainer.js";
