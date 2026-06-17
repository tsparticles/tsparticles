import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadExternalPauseInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalPause", async container => {
      const { Pauser } = await import("./Pauser.js");

      return new Pauser(container);
    });
  });
}
