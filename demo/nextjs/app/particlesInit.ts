import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
    import("@tsparticles/slim"),
    import("@tsparticles/plugin-themes"),
  ]);

  await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
}
