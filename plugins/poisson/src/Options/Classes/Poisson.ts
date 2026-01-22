import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IPoisson } from "../Interfaces/IPoisson.js";

/**
 * [[include:Options/Plugins/Poisson.md]]
 */
export class Poisson implements IPoisson, IOptionLoader<IPoisson> {
  dimensions;
  enable;
  radius;
  retries;
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

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.dimensions !== undefined) {
      this.dimensions = data.dimensions;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.retries !== undefined) {
      this.retries = data.retries;
    }
  }
}
