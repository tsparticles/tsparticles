import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IPoisson } from "../Interfaces/IPoisson.js";

/**
 * [[include:Options/Plugins/Poisson.md]]
 */
export class Poisson implements IPoisson, IOptionLoader<IPoisson> {
  /** The poisson dimensions */
  dimensions;
  /** Enables the poisson disc sampling */
  enable;
  /** The poisson radius */
  radius;
  /** The poisson retries */
  retries;
  /** The poisson steps */
  steps;

  constructor() {
    this.enable = false;
    this.dimensions = 2;
    this.radius = 0;
    this.retries = 30;
    this.steps = 0;
  }

  load(data?: RecursivePartial<IPoisson>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "dimensions", data.dimensions);
    loadProperty(this, "radius", data.radius);
    loadProperty(this, "retries", data.retries);
  }
}
