import { type Engine } from "@tsparticles/engine";
import { loadAbsorbersInteraction } from "./interaction.js";
import { loadAbsorbersPluginSimple } from "./plugin.js";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
  await loadAbsorbersPluginSimple(engine);
  await loadAbsorbersInteraction(engine);
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
