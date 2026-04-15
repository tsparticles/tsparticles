import type { Engine } from "@tsparticles/engine";

const presetName = "matrix";

/**
 * @param engine -
 */
export async function loadMatrixPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    const [
      { loadBasic },
      { loadShadowEffect },
      { loadPoissonDiscPlugin },
      { loadTrailPlugin },
      { loadMatrixShape },
      { options },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/effect-shadow"),
      import("@tsparticles/plugin-poisson-disc"),
      import("@tsparticles/plugin-trail"),
      import("@tsparticles/shape-matrix"),
      import("./options.js"),
    ]);

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
