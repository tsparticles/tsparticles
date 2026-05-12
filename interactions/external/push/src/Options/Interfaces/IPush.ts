import type { IParticlesOptions, RangeValue, RecursivePartial, SingleOrMultiple } from "@tsparticles/engine";

/** Push mode options */
export interface IPush {
  /** Whether to use the default groups */
  default: boolean;
  /** Groups to push particles from */
  groups: string[];
  /** Particles options for pushed particles */
  particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
  /** Number of particles to push */
  quantity: RangeValue;
}
