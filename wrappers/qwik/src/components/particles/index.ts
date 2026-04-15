import type { IParticlesProps } from "./IParticlesProps";
import { initParticlesEngine, type ParticlesPluginRegistrar } from "./initParticlesEngine";
import Particles from "./particles";

export type { IParticlesProps };
export type ParticlesProps = IParticlesProps;
export type { ParticlesPluginRegistrar };

export default Particles;

export { Particles, initParticlesEngine };
