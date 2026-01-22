import type { Container, IOptions, IParticlesOptions, Options, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { Blend } from "./Options/Classes/Blend.js";
import type { IBlend } from "./Options/Interfaces/IBlend.js";

export type IBlendParticlesOptions = IParticlesOptions & {
  blend?: IBlend;
};

export type BlendParticlesOptions = ParticlesOptions & {
  blend?: Blend;
};

export type IBlendOptions = IOptions & {
  blend?: IBlend;

  particles: IBlendParticlesOptions;
};

export type BlendOptions = Options & {
  blend?: Blend;

  particles: BlendParticlesOptions;
};

export type BlendContainer = Container & {
  actualOptions: BlendOptions;
};

export type BlendParticle = Particle & {
  options: BlendParticlesOptions;
  originalBlendMode?: GlobalCompositeOperation;
};
