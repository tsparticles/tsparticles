import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IBounce } from "../Interfaces/IBounce.js";

/** Bounce mode options class */
export class Bounce implements IBounce, IOptionLoader<IBounce> {
  /** Bounce distance in pixels */
  distance: number;

  constructor() {
    this.distance = 200;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IBounce>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);
  }
}
