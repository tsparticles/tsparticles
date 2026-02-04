import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export async function loadExternalPushInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.addInteractor?.("externalPush", async container => {
      const { Pusher } = await import("./Pusher.js");

      return new Pusher(container);
    });
  });
}

export * from "./Options/Classes/Push.js";
export type * from "./Options/Interfaces/IPush.js";
