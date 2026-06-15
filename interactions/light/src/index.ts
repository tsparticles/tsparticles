import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { type Engine } from "@tsparticles/engine";
import { ExternalLighter } from "./ExternalLighter.js";
import { ParticlesLighter } from "./ParticlesLighter.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLightInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalLight", container => {
      return Promise.resolve(new ExternalLighter(e.pluginManager, container));
    });

    e.pluginManager.addInteractor?.("particlesLight", container => {
      return Promise.resolve(new ParticlesLighter(e.pluginManager, container));
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
