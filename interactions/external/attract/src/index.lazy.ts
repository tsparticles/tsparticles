import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * Loads the external attract interaction plugin (lazy version)
 * @param engine - The engine instance to register the plugin with
 */
export async function loadExternalAttractInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalAttract", async container => {
      const { Attractor } = await import("./Attractor.js");

      return new Attractor(e.pluginManager, container);
    });
  });
}

export * from "./Options/Classes/Attract.js";
export type * from "./Options/Interfaces/IAttract.js";
