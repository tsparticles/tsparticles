import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { Parallaxer } from "./Parallaxer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadExternalParallaxInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalParallax", container => {
      return Promise.resolve(new Parallaxer(container));
    });
  });
}

export * from "./Options/Classes/Parallax.js";
export type * from "./Options/Interfaces/IParallax.js";
