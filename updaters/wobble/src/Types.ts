import type { IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { IWobble } from "./Options/Interfaces/IWobble.js";
import type { Wobble } from "./Options/Classes/Wobble.js";

/**
 * Particle wobble data
 */
export interface IParticleWobble {
  /** Current wobble angle */
  angle: number;
  /** Wobble angle speed */
  angleSpeed: number;
  /** Wobble movement speed */
  moveSpeed: number;
}

/**
 * Wobble particle extension type
 */
export type WobbleParticle = Particle & {
  options: WobbleParticlesOptions;

  /**
   * Particle retina cached options
   */
  retina: {
    /**
     * The particle maximum wobble distance
     */
    wobbleDistance?: number;
  };

  wobble?: IParticleWobble;
};

export type IWobbleParticlesOptions = IParticlesOptions & {
  wobble?: IWobble;
};

export type WobbleParticlesOptions = ParticlesOptions & {
  wobble?: Wobble;
};
