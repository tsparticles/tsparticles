import type {
  GradientType,
  IParticleHslAnimation,
  IParticleNumericValueAnimation,
  IParticlesOptions,
  Particle,
  ParticlesOptions,
  SingleOrMultiple,
} from "@tsparticles/engine";
import type { AnimatableGradient } from "./Options/Classes/AnimatableGradient.js";
import type { IAnimatableGradient } from "./Options/Interfaces/IAnimatableGradient.js";

/** Particle gradient color animation interface */
export interface IParticleGradientColorAnimation {
  /** Opacity animation */
  opacity?: IParticleNumericValueAnimation;
  /** Color stop position */
  stop: number;
  /** HSL animation values */
  value: IParticleHslAnimation;
}

/** Particle gradient animation interface */
export interface IParticleGradientAnimation {
  /** Angle animation */
  angle: IParticleNumericValueAnimation;
  /** Gradient colors */
  colors: IParticleGradientColorAnimation[];
  /** Gradient type */
  type: GradientType;
}

/** Gradient particle extension type */
export type GradientParticle = Particle & {
  /**
   * Gets the particle gradient options
   */
  gradient?: IParticleGradientAnimation;
  /** Gradient particles options */
  options: GradientParticlesOptions;
};

/** Gradient particles options interface */
export type IGradientParticlesOptions = IParticlesOptions & {
  /** Gradient options */
  gradient?: SingleOrMultiple<IAnimatableGradient>;
};

/** Gradient particles options */
export type GradientParticlesOptions = ParticlesOptions & {
  /** Gradient options */
  gradient?: SingleOrMultiple<AnimatableGradient>;
};
