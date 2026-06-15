import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ISlow } from "../Interfaces/ISlow.js";

/** Slow mode options class */
export class Slow implements ISlow, IOptionLoader<ISlow> {
  /** Slow factor multiplier */
  factor = 3;
  /** Slow radius in pixels */
  radius = 200;

  load(data?: RecursivePartial<ISlow>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "factor", data.factor);
    loadProperty(this, "radius", data.radius);
  }
}
