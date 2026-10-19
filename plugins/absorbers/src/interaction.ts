import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import { AbsorbersInteractor } from "./AbsorbersInteractor.js";
import { type Engine } from "@tsparticles/engine";
import { getAbsorbersInstancesManager } from "./getAbsorbersInstancesManager.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAbsorbersInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const pluginManager = e.pluginManager,
      instancesManager = await getAbsorbersInstancesManager(e);

    ensureInteractivityPluginLoaded(e);

    pluginManager.addInteractor?.("externalAbsorbers", container => {
      return Promise.resolve(new AbsorbersInteractor(container as AbsorberContainer, instancesManager));
    });
  });
}

export type * from "./AbsorberContainer.js";
export type * from "./AbsorberInstance.js";
export type * from "./AbsorbersInstancesManager.js";
export * from "./getAbsorbersInstancesManager.js";
export * from "./Options/Classes/Absorber.js";
export * from "./Options/Classes/AbsorberLife.js";
export * from "./Options/Classes/AbsorberSize.js";
export * from "./Options/Classes/AbsorberSizeLimit.js";
export * from "./Options/Classes/AbsorberSplit.js";
export type * from "./Options/Interfaces/IAbsorber.js";
export type * from "./Options/Interfaces/IAbsorberLife.js";
export type * from "./Options/Interfaces/IAbsorberSize.js";
export type * from "./Options/Interfaces/IAbsorberSizeLimit.js";
export type * from "./Options/Interfaces/IAbsorberSplit.js";
export type * from "./types.js";
