import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { TrailMaker } from "./TrailMaker.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadExternalTrailInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalTrail", container => {
      return Promise.resolve(new TrailMaker(e.pluginManager, container));
    });
  });
}

export * from "./Options/Classes/Trail.js";
export type * from "./Options/Interfaces/ITrail.js";
export type { ITrailColorWeight } from "./Options/Interfaces/ITrailColorWeight.js";
export type { ITrailColorCoords } from "./Options/Interfaces/ITrailColorCoords.js";
export type { ITrailColorComponent } from "./Options/Interfaces/ITrailColorComponent.js";
