import Particles from "./src/Particles.astro";
import { initParticlesEngine, type ParticlesPluginRegistrar } from "./src/initParticlesEngine";

export type { ParticlesPluginRegistrar };

export { initParticlesEngine };
export default Particles;
