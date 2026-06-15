import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IBounce } from "../Interfaces/IBounce.js";

/** Bounce mode options class */
export class Bounce implements IBounce, IOptionLoader<IBounce> {
  /** Bounce distance in pixels */
  distance = 200;

  load(data?: RecursivePartial<IBounce>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);
  }
}
