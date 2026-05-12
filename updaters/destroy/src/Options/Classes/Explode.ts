import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IExplode } from "../Interfaces/IExplode.js";

/** Explode options class */
export class Explode implements IExplode, IOptionLoader<IExplode> {
  /** Maximum size factor for the explosion */
  maxSizeFactor: number;
  /** Speed of the explosion */
  speed: number;

  /** Explode constructor */
  constructor() {
    this.maxSizeFactor = 3;
    this.speed = 2;
  }

  /**
   * Loads the explode options from data
   * @param data
   */
  load(data?: RecursivePartial<IExplode>): void {
    if (isNull(data)) {
      return;
    }

    if (data.maxSizeFactor !== undefined) {
      this.maxSizeFactor = data.maxSizeFactor;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }
}
