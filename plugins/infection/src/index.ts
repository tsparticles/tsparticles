import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadInfectionPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const [
      { ensureInteractivityPluginLoaded },
      { InfectionPlugin },
    ] = await Promise.all([
      import("@tsparticles/plugin-interactivity"),
      import("./InfectionPlugin.js"),
    ]);

    ensureInteractivityPluginLoaded(e);

    e.addPlugin(new InfectionPlugin());

    e.addInteractor?.("particlesInfection", async container => {
      const { ParticlesInfecter } = await import("./ParticlesInfecter.js");

      return new ParticlesInfecter(container);
    });
  });
}

export type * from "./Options/Interfaces/IInfection.js";
export type * from "./Options/Interfaces/IInfectionStage.js";
