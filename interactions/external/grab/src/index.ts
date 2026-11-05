import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import type { Engine } from "@tsparticles/engine";
import { Grabber } from "./Grabber.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the interaction for.
 */
export async function loadExternalGrabInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalGrab", container => {
      return Promise.resolve(new Grabber(e.pluginManager, container));
    });
  });
}

export * from "./Options/Classes/Grab.js";
export * from "./Options/Classes/GrabLinks.js";
export type * from "./Options/Interfaces/IGrab.js";
export type * from "./Options/Interfaces/IGrabLinks.js";
