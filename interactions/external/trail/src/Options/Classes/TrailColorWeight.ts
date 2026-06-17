import { type IOptionLoader, type RecursivePartial, loadProperty } from "@tsparticles/engine";
import type { ITrailColorWeight } from "../Interfaces/ITrailColorWeight.js";

export class TrailColorWeight implements ITrailColorWeight, IOptionLoader<ITrailColorWeight> {
  x = 0;
  y = 0;

  load(data?: RecursivePartial<ITrailColorWeight>): void {
    if (!data) {
      return;
    }

    loadProperty(this, "x", data.x);
    loadProperty(this, "y", data.y);
  }
}
