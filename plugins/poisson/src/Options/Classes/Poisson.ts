import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IPoisson } from "../Interfaces/IPoisson.js";

/**
 * [[include:Options/Plugins/Poisson.md]]
 */
export class Poisson implements IPoisson, IOptionLoader<IPoisson> {
  /** The poisson dimensions */
  dimensions = 2;
  /** Enables the poisson disc sampling */
  enable = false;
  /** The poisson radius */
  radius = 0;
  /** The poisson retries */
  retries = 30;
  /** The poisson steps */
  steps = 0;

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
