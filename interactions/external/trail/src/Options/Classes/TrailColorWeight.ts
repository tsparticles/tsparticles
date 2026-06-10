import { type IOptionLoader, type RecursivePartial, loadProperty } from "@tsparticles/engine";
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

    loadProperty(this, "x", data.x);
    loadProperty(this, "y", data.y);
  }
}
