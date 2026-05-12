import type { Container, IOptions, IParticlesOptions, Options, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { Blend } from "./Options/Classes/Blend.js";
import type { IBlend } from "./Options/Interfaces/IBlend.js";

/** Blend particles options interface */
export type IBlendParticlesOptions = IParticlesOptions & {
  /** The blend options */
  blend?: IBlend;
};

/** Blend particles options */
export type BlendParticlesOptions = ParticlesOptions & {
  /** The blend options */
  blend?: Blend;
};

/** Blend options interface */
export type IBlendOptions = IOptions & {
  /** The blend options */
  blend?: IBlend;

  /** The particles options */
  particles: IBlendParticlesOptions;
};

/** Blend options */
export type BlendOptions = Options & {
  /** The blend options */
  blend?: Blend;

  /** The particles options */
  particles: BlendParticlesOptions;
};

/** Blend container type */
export type BlendContainer = Container & {
  /** The blend options */
  actualOptions: BlendOptions;
};

/** Blend particle type */
export type BlendParticle = Particle & {
  /** The particle's blend options */
  options: BlendParticlesOptions;
  /** The original blend mode before applying the blend effect */
  originalBlendMode?: GlobalCompositeOperation;
};
