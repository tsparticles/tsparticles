import { type IParticlesOptions, type Particle, type ParticlesOptions } from "@tsparticles/engine";
import type { ISize } from "./Options/Interfaces/ISize.js";
import type { Size } from "./Options/Classes/Size.js";

export type SizeParticlesOptions = ParticlesOptions & {
  size?: Size;
};

export type ISizeParticlesOptions = IParticlesOptions & {
  size?: ISize;
};

export type SizeParticle = Particle & {
  options: SizeParticlesOptions;
};
