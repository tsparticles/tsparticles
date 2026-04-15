import type { IParticlesProps } from "./IParticlesProps";
import Particles from "./Particles";
import { initParticlesEngine, type ParticlesPluginRegistrar } from "./initParticlesEngine";

export type { ParticlesPluginRegistrar };

export default Particles;
export { initParticlesEngine, IParticlesProps, Particles };
