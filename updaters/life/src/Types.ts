import type { IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { ILife } from "./Options/Interfaces/ILife.js";
import type { Life } from "./Options/Classes/Life.js";

/** Particle life animation interface */
export interface IParticleLife {
  /** Number of life cycles remaining */
  count: number;
  /** Delay between life cycles */
  delay: number;
  /** Current delay time */
  delayTime: number;
  /** Duration of each life cycle */
  duration: number;
  /** Current life time */
  time: number;
}

/** Life particles options interface */
export type ILifeParticlesOptions = IParticlesOptions & {
  /** Life options */
  life?: ILife;
};

/** Life particles options */
export type LifeParticlesOptions = ParticlesOptions & {
  /** Life options */
  life?: Life;
};

/** Life particle extension type */
export type LifeParticle = Particle & {
  /** Life animation state */
  life?: IParticleLife;
  /** Life particles options */
  options: LifeParticlesOptions;
};
