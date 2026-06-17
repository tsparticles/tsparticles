import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { InteractivityParticleMaker } from "./InteractivityParticleMaker.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadExternalParticleInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalParticle", container => {
      return Promise.resolve(new InteractivityParticleMaker(container));
    });
  });
}
