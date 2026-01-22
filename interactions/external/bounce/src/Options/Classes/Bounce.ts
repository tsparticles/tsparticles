import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IBounce } from "../Interfaces/IBounce.js";

export class Bounce implements IBounce, IOptionLoader<IBounce> {
  distance: number;

  constructor() {
    this.distance = 200;
  }

  load(data?: RecursivePartial<IBounce>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
}
