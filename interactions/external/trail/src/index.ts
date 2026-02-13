import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalTrailInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.addInteractor?.("externalTrail", async container => {
      const { TrailMaker } = await import("./TrailMaker.js");

      return new TrailMaker(e, container);
    });
  });
}

export * from "./Options/Classes/Trail.js";
export type * from "./Options/Interfaces/ITrail.js";
export type { ITrailColorWeight } from "./Options/Interfaces/ITrailColorWeight.js";
export type { ITrailColorCoords } from "./Options/Interfaces/ITrailColorCoords.js";
export type { ITrailColorComponent } from "./Options/Interfaces/ITrailColorComponent.js";
