import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IExplode } from "../Interfaces/IExplode.js";

export class Explode implements IExplode, IOptionLoader<IExplode> {
  maxSizeFactor: number;
  speed: number;

  constructor() {
    this.maxSizeFactor = 3;
    this.speed = 2;
  }

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
