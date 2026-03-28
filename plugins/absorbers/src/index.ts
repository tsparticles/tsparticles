import type { AbsorberContainer } from "./AbsorberContainer.js";
import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const [
        { ensureInteractivityPluginLoaded },
        { AbsorbersInstancesManager },
        { AbsorbersPlugin },
      ] = await Promise.all([
        import("@tsparticles/plugin-interactivity"),
        import("./AbsorbersInstancesManager.js"),
        import("./AbsorbersPlugin.js"),
      ]),
      instancesManager = new AbsorbersInstancesManager(e.pluginManager);

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new AbsorbersPlugin(instancesManager));

    e.pluginManager.addInteractor?.("externalAbsorbers", async container => {
      const { AbsorbersInteractor } = await import("./AbsorbersInteractor.js");

      return new AbsorbersInteractor(instancesManager, container as AbsorberContainer);
    });
  });
}

export type * from "./AbsorberContainer.js";
