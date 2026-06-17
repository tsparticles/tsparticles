import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import type { InfectableContainer } from "./Types.js";
import { InfectionPlugin } from "./InfectionPlugin.js";
import { ParticlesInfecter } from "./ParticlesInfecter.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadInfectionPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new InfectionPlugin());

    e.pluginManager.addInteractor?.("particlesInfection", (container: InfectableContainer) => {
      return Promise.resolve(new ParticlesInfecter(container));
    });
  });
}

export type * from "./Options/Interfaces/IInfection.js";
export type * from "./Options/Interfaces/IInfectionStage.js";
