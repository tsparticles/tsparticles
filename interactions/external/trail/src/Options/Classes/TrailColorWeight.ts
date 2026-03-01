import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { ITrailColorWeight } from "../Interfaces/ITrailColorWeight.js";

export class TrailColorWeight implements ITrailColorWeight, IOptionLoader<ITrailColorWeight> {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  load(data?: RecursivePartial<ITrailColorWeight>): void {
    if (!data) {
      return;
    }

    if (data.x !== undefined) {
      this.x = data.x;
    }

    if (data.y !== undefined) {
      this.y = data.y;
    }
  }
}
