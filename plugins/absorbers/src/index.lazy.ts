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
