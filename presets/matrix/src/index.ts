import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadMatrixShape } from "@tsparticles/shape-matrix";
import { loadPoissonDiscPlugin } from "@tsparticles/plugin-poisson-disc";
import { loadShadowEffect } from "@tsparticles/effect-shadow";
import { loadTrailPlugin } from "@tsparticles/plugin-trail";
import { options } from "./options.js";

const presetName = "matrix";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadMatrixPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      loadShadowEffect(e),
      loadTrailPlugin(e),
      loadPoissonDiscPlugin(e),
      loadMatrixShape(e),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
