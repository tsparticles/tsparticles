import type { Engine } from "@tsparticles/engine/lazy";

const presetName = "matrix";

/**
 * @param engine - The engine to load the shape in
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
      import("@tsparticles/basic/lazy"),
      import("@tsparticles/effect-shadow/lazy"),
      import("@tsparticles/plugin-poisson-disc/lazy"),
      import("@tsparticles/plugin-trail/lazy"),
      import("@tsparticles/shape-matrix/lazy"),
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
