import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadLightInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.addInteractor?.("externalLight", async container => {
      const { ExternalLighter } = await import("./ExternalLighter.js");

      return new ExternalLighter(container, engine);
    });
    e.addInteractor?.("particlesLight", async container => {
      const { ParticlesLighter } = await import("./ParticlesLighter.js");

      return new ParticlesLighter(container, engine);
    });
  });
}

export * from "./Options/Classes/Light.js";
export * from "./Options/Classes/LightArea.js";
export * from "./Options/Classes/LightGradient.js";
export * from "./Options/Classes/LightShadow.js";
export type * from "./Options/Interfaces/ILight.js";
export type * from "./Options/Interfaces/ILightArea.js";
export type * from "./Options/Interfaces/ILightGradient.js";
export type * from "./Options/Interfaces/ILightShadow.js";
