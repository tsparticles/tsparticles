import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Bubbler } from "./Bubbler.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Loads the external bubble interaction plugin
 * @param engine - The engine instance to register the plugin with
 */
export async function loadExternalBubbleInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalBubble", container => {
      return Promise.resolve(new Bubbler(e.pluginManager, container));
    });
  });
}

export * from "./Options/Classes/BubbleBase.js";
export * from "./Options/Classes/BubbleDiv.js";
export * from "./Options/Classes/Bubble.js";
export type * from "./Options/Interfaces/IBubbleBase.js";
export type * from "./Options/Interfaces/IBubbleDiv.js";
export type * from "./Options/Interfaces/IBubble.js";
