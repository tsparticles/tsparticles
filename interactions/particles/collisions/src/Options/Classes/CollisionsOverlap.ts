import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ICollisionsOverlap } from "../Interfaces/ICollisionsOverlap.js";

export class CollisionsOverlap implements ICollisionsOverlap, IOptionLoader<ICollisionsOverlap> {
  /** Enables collision overlap */
  enable = true;
  /** The number of overlap retries */
  retries = 0;

  load(data?: RecursivePartial<ICollisionsOverlap>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "retries", data.retries);
  }
}
