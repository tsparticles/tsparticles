import Particles from "./Particles";
import { initParticlesEngine, type ParticlesPluginRegistrar } from "./initParticlesEngine";

export type { IParticlesProps, IParticlesProps as ParticlesProps } from "./IParticlesProps";
export type { IParticlesState, IParticlesState as ParticlesState } from "./IParticlesState";
export type { ParticlesPluginRegistrar };

export default Particles;
export { Particles, initParticlesEngine };
