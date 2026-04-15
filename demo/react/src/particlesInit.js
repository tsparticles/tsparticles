export async function registerParticles(engine) {
  const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
    import("@tsparticles/slim"),
    import("@tsparticles/plugin-themes"),
  ]);

  await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
}
