import { particles } from "@tsparticles/particles";

export async function registerParticles(): Promise<void> {
  await particles.init();
}
