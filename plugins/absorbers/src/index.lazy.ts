import { type Engine } from "@tsparticles/engine/lazy";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
  const [{ loadAbsorbersInteraction }, { loadAbsorbersPluginSimple }] = await Promise.all([
    import("./interaction.lazy.js"),
    import("./plugin.lazy.js"),
  ]);

  await Promise.all([
    loadAbsorbersPluginSimple(engine),
    loadAbsorbersInteraction(engine),
  ]);
}

export type * from "./AbsorberContainer.js";
export type * from "./Options/Interfaces/IAbsorber.js";
export type * from "./Options/Interfaces/IAbsorberLife.js";
export type * from "./Options/Interfaces/IAbsorberSize.js";
export type * from "./Options/Interfaces/IAbsorberSizeLimit.js";
export type * from "./Options/Interfaces/IAbsorberSplit.js";
export type * from "./types.js";
