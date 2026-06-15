import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IDestroy } from "../Interfaces/IDestroy.js";

/** Destroy mode options class */
export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
  /** Destroy distance in pixels */
  distance = 200;

  load(data?: RecursivePartial<IDestroy>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);
  }
}
