import { type IParticlesOptions, type Particle, type ParticlesOptions } from "@tsparticles/engine";
import type { IOpacity } from "./Options/Interfaces/IOpacity.js";
import type { Opacity } from "./Options/Classes/Opacity.js";

export type OpacityParticlesOptions = ParticlesOptions & {
  opacity?: Opacity;
};

export type IOpacityParticlesOptions = IParticlesOptions & {
  opacity?: IOpacity;
};

export type OpacityParticle = Particle & {
  options: OpacityParticlesOptions;
};
