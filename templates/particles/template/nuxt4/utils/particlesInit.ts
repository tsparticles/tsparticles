import { createParticles } from "@tsparticles/particles";
import { engine } from "../particlesEngine";
const particles = createParticles(engine);

export async function registerParticles(): Promise<void> {
  await particles.init();
}

export { engine } from "../particlesEngine";
