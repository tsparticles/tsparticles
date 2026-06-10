import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ICollisionsOverlap } from "../Interfaces/ICollisionsOverlap.js";

export class CollisionsOverlap implements ICollisionsOverlap, IOptionLoader<ICollisionsOverlap> {
  /** Enables collision overlap */
  enable: boolean;
  /** The number of overlap retries */
  retries: number;

  constructor() {
    this.enable = true;
    this.retries = 0;
  }

  load(data?: RecursivePartial<ICollisionsOverlap>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "retries", data.retries);
  }
}
