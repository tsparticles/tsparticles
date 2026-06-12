import {
  type IOptionLoader,
  type IParticlesOptions,
  type RangeValue,
  type RecursivePartial,
  type SingleOrMultiple,
  deepExtend,
  executeOnSingleOrMultiple,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IPush } from "../Interfaces/IPush.js";

/** Push mode options class */
export class Push implements IPush, IOptionLoader<IPush> {
  /** Whether to use the default groups */
  default = true;
  /** Groups to push particles from */
  groups: string[] = [];
  /** Particles options for pushed particles */
  particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
  /** Number of particles to push */
  quantity: RangeValue = 4;

  /** @inheritDoc */
  load(data?: RecursivePartial<IPush>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "default", data.default);

    if (data.groups !== undefined) {
      this.groups = data.groups.map(t => t);
    }

    if (!this.groups.length) {
      this.default = true;
    }

    loadRangeProperty(this, "quantity", data.quantity);

    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
    });
  }
}
