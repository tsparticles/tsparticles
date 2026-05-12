import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
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

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
}
