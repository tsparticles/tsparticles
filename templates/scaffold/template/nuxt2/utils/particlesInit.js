export async function registerParticles(engine) {
  const { loadSlim } = await import("@tsparticles/slim");

  await loadSlim(engine);
}
