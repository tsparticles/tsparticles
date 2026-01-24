import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the interaction for.
 */
export async function loadExternalGrabInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

    await loadInteractivityPlugin(e);

    e.addInteractor?.("externalGrab", async container => {
      const { Grabber } = await import("./Grabber.js");

      return new Grabber(container, engine);
    });
  });
}

export * from "./Options/Classes/Grab.js";
export * from "./Options/Classes/GrabLinks.js";
export type * from "./Options/Interfaces/IGrab.js";
export type * from "./Options/Interfaces/IGrabLinks.js";
