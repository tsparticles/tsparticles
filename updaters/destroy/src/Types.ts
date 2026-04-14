import type { IBounds, IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { Destroy } from "./Options/Classes/Destroy.js";
import type { IDestroy } from "./Options/Interfaces/IDestroy.js";

export type IDestroyParticlesOptions = IParticlesOptions & {
  destroy?: IDestroy;
};

export type DestroyParticlesOptions = ParticlesOptions & {
  destroy?: Destroy;
};

export type DestroyParticle = Particle & {
  destroyBounds?: Partial<IBounds>;
  explode?: {
    initialFillOpacity: number;
    initialSize: number;
    initialStrokeOpacity: number;
    maxSize: number;
    progress: number;
    speed: number;
  };
  options: DestroyParticlesOptions;
  /**
   * Sets the count of particles created when destroyed with split mode
   */
  splitCount?: number;
  unbreakableUntil?: number;
};
