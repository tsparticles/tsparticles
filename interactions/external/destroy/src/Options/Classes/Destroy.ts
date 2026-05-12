import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IDestroy } from "../Interfaces/IDestroy.js";

/** Destroy mode options class */
export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
  /** Destroy distance in pixels */
  distance: number;

  constructor() {
    this.distance = 200;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IDestroy>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
}
