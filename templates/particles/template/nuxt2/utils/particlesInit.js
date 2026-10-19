export async function registerParticles() {
  const { particles } = await import("@tsparticles/particles");

  await particles.init();
}
