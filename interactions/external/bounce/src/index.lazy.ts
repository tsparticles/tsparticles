import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * Loads the external bounce interaction plugin (lazy version)
 * @param engine - The engine instance to register the plugin with
 */
export async function loadExternalBounceInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalBounce", async container => {
      const { Bouncer } = await import("./Bouncer.js");

      return new Bouncer(container);
    });
  });
}

export * from "./Options/Classes/Bounce.js";
export type * from "./Options/Interfaces/IBounce.js";
