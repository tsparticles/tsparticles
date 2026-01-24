import { type IParticlesOptions, type Particle, type ParticlesOptions } from "@tsparticles/engine";
import type { IRoll } from "./Options/Interfaces/IRoll.js";
import type { Roll } from "./Options/Classes/Roll.js";

export type RollParticle = Particle & {
  options: RollParticlesOptions;
};

export type RollParticlesOptions = ParticlesOptions & {
  roll?: Roll;
};

export type IRollParticlesOptions = IParticlesOptions & {
  roll?: IRoll;
};
