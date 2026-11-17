import type { IHsl, IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { ColorTransitions } from "./Options/Classes/ColorTransitions.js";
import type { IColorTransitions } from "./Options/Interfaces/IColorTransitions.js";

/** A single resolved color transition stop */
export interface IColorTransitionStopState {
  /** The resolved stop color */
  color: IHsl;
  /** The stop position in the transition, between 0 and 1 */
  offset: number;
}

/** Particle lifetime color transition state */
export interface IParticleLifetimeColorTransitions {
  /** The current interpolated color */
  current?: IHsl;
  /** Whether the transition is enabled for the particle */
  enable: boolean;
  /** Per-particle transition progress offset, used when sync is disabled */
  offset: number;
  /** The resolved stops, sorted by offset */
  stops: IColorTransitionStopState[];
}

/** Particle color transitions state */
export interface IParticleColorTransitions {
  /** Lifetime-based transitions */
  lifetime: IParticleLifetimeColorTransitions;
}

/** Minimal structural subset of the life updater particle state used by this updater */
export interface IParticleLifeState {
  /** Duration of each life cycle */
  duration: number;
  /** Current life time */
  time: number;
}

/** Color transitions particle extension type */
export type ColorTransitionsParticle = Particle & {
  /** The particle color transitions state */
  colorTransitions?: IParticleColorTransitions;
  /** The particle life state, created by the life updater when loaded */
  life?: IParticleLifeState;
  /** Color transitions particles options */
  options: ColorTransitionsParticlesOptions;
};

/** Color transitions particles options interface */
export type IColorTransitionsParticlesOptions = IParticlesOptions & {
  /** Color transitions options */
  colorTransitions?: IColorTransitions;
};

/** Color transitions particles options */
export type ColorTransitionsParticlesOptions = ParticlesOptions & {
  /** Color transitions options */
  colorTransitions?: ColorTransitions;
};
