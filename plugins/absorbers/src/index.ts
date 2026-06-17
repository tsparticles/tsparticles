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
