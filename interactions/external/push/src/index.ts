import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import type { Engine } from "@tsparticles/engine";
import { Pusher } from "./Pusher.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export async function loadExternalPushInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalPush", container => {
      return Promise.resolve(new Pusher(container));
    });
  });
}

export * from "./Options/Classes/Push.js";
export type * from "./Options/Interfaces/IPush.js";
