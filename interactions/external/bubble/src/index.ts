import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalBubbleInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.addInteractor?.("externalBubble", async container => {
      const { Bubbler } = await import("./Bubbler.js");

      return new Bubbler(e, container);
    });
  });
}

export * from "./Options/Classes/BubbleBase.js";
export * from "./Options/Classes/BubbleDiv.js";
export * from "./Options/Classes/Bubble.js";
export type * from "./Options/Interfaces/IBubbleBase.js";
export type * from "./Options/Interfaces/IBubbleDiv.js";
export type * from "./Options/Interfaces/IBubble.js";
