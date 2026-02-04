import type { AbsorberContainer } from "./AbsorberContainer.js";
import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const [
        { ensureInteractivityPluginLoaded },
        { AbsorbersInstancesManager },
        { AbsorbersPlugin },
      ] = await Promise.all([
        import("@tsparticles/plugin-interactivity"),
        import("./AbsorbersInstancesManager.js"),
        import("./AbsorbersPlugin.js"),
      ]),
      instancesManager = new AbsorbersInstancesManager(e);

    ensureInteractivityPluginLoaded(e);

    e.addPlugin(new AbsorbersPlugin(instancesManager));

    e.addInteractor?.("externalAbsorbers", async container => {
      const { AbsorbersInteractor } = await import("./AbsorbersInteractor.js");

      return new AbsorbersInteractor(container as AbsorberContainer, instancesManager);
    });
  });
}

export type * from "./AbsorberContainer.js";
