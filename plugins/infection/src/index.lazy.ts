import { type Engine } from "@tsparticles/engine/lazy";
import type { InfectableContainer } from "./Types.js";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadInfectionPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const [
      { ensureInteractivityPluginLoaded },
      { InfectionPlugin },
    ] = await Promise.all([
      import("@tsparticles/plugin-interactivity/lazy"),
      import("./InfectionPlugin.js"),
    ]);

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new InfectionPlugin());

    e.pluginManager.addInteractor?.("particlesInfection", async (container: InfectableContainer) => {
      const { ParticlesInfecter } = await import("./ParticlesInfecter.js");

      return new ParticlesInfecter(container);
    });
  });
}

export type * from "./Options/Interfaces/IInfection.js";
export type * from "./Options/Interfaces/IInfectionStage.js";
