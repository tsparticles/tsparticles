import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * Loads the external bubble interaction plugin (lazy version)
 * @param engine - The engine instance to register the plugin with
 */
export async function loadExternalBubbleInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalBubble", async container => {
      const { Bubbler } = await import("./Bubbler.js");

      return new Bubbler(e.pluginManager, container);
    });
  });
}

export * from "./Options/Classes/BubbleBase.js";
export * from "./Options/Classes/BubbleDiv.js";
export * from "./Options/Classes/Bubble.js";
export type * from "./Options/Interfaces/IBubbleBase.js";
export type * from "./Options/Interfaces/IBubbleDiv.js";
export type * from "./Options/Interfaces/IBubble.js";
