import {
  type ICoordinates,
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IAttract } from "../Interfaces/IAttract.js";

/**
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
  distance: RangeValue = 200;
  enable = false;
  rotate: ICoordinates;

  constructor() {
    this.rotate = {
      x: 3000,
      y: 3000,
    };
  }

  load(data?: RecursivePartial<IAttract>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "distance", data.distance);
    loadProperty(this, "enable", data.enable);

    if (data.rotate) {
      const rotateX = data.rotate.x;

      if (rotateX !== undefined) {
        this.rotate.x = rotateX;
      }

      const rotateY = data.rotate.y;

      if (rotateY !== undefined) {
        this.rotate.y = rotateY;
      }
    }
  }
}
