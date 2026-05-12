import type { IBounds, IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { Destroy } from "./Options/Classes/Destroy.js";
import type { IDestroy } from "./Options/Interfaces/IDestroy.js";

/** Destroy particles options interface */
export type IDestroyParticlesOptions = IParticlesOptions & {
  /** Destroy options */
  destroy?: IDestroy;
};

/** Destroy particles options */
export type DestroyParticlesOptions = ParticlesOptions & {
  /** Destroy options */
  destroy?: Destroy;
};

/** Destroy particle extension type */
export type DestroyParticle = Particle & {
  /** Destroy bounds */
  destroyBounds?: Partial<IBounds>;
  /** Explosion state */
  exploding?: {
    /** Initial fill opacity */
    initialFillOpacity: number;
    /** Initial size */
    initialSize: number;
    /** Initial stroke opacity */
    initialStrokeOpacity: number;
    /** Maximum size */
    maxSize: number;
    /** Explosion progress */
    progress: number;
    /** Explosion speed */
    speed: number;
  };
  /** Destroy particles options */
  options: DestroyParticlesOptions;
  /**
   * Sets the count of particles created when destroyed with split mode
   */
  splitCount?: number;
  /** Timestamp until the particle becomes breakable */
  unbreakableUntil?: number;
};
