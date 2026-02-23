import {
  type ICoordinates,
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  setRangeValue,
} from "@tsparticles/engine";
import type { IAttract } from "../Interfaces/IAttract.js";

/**
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
  distance: RangeValue;
  enable;
  rotate: ICoordinates;

  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000,
    };
  }

  load(data?: RecursivePartial<IAttract>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = setRangeValue(data.distance);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

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
