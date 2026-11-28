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

/** Particle lifetime color transition state for a single paint channel (fill or stroke) */
export interface IColorTransitionChannelState {
  /** The current interpolated channel color */
  current?: IHsl;
  /** Reusable interpolation output object, avoiding per-frame allocations */
  result?: IHsl;
  /**
   * The resolved channel stops, sorted by offset; channels without their own stops share the single
   * resolved shared stops array, so random stop colors resolve once for both fill and stroke
   */
  stops: IColorTransitionStopState[];
}

/** Particle lifetime color transition state */
export interface IParticleLifetimeColorTransitions {
  /** Custom transition duration in milliseconds, overriding the particle life duration */
  duration?: number;
  /** Whether the transition is enabled for the particle */
  enable: boolean;
  /** Fill channel state */
  fill?: IColorTransitionChannelState;
  /** Per-particle transition progress offset, used when sync is disabled */
  offset: number;
  /** Stroke channel state */
  stroke?: IColorTransitionChannelState;
  /** Elapsed standalone transition time in milliseconds */
  time: number;
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
