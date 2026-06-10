import {
  type IOptionLoader,
  type IRangeValue,
  type RangeValue,
  type RecursivePartial,
  isNull,
  isNumber,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IWobble } from "../Interfaces/IWobble.js";
import type { IWobbleSpeed } from "../Interfaces/IWobbleSpeed.js";
import { WobbleSpeed } from "./WobbleSpeed.js";

/**
 * Wobble options class
 * [[include:Options/Particles/Wobble.md]]
 */
export class Wobble implements IWobble, IOptionLoader<IWobble> {
  /** Wobble distance */
  distance: RangeValue = 5;
  /** Enables the wobble */
  enable = false;
  /** Wobble speed */
  readonly speed: WobbleSpeed = new WobbleSpeed();
  /** Wobble constructor */

  /**
   * Loads the wobble options from data
   * @param data
   */
  load(data?: RecursivePartial<IWobble>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "distance", data.distance);

    loadProperty(this, "enable", data.enable);

    if (data.speed !== undefined) {
      if (isNumber(data.speed)) {
        this.speed.load({ angle: data.speed });
      } else {
        const rangeSpeed = data.speed as IRangeValue;

        if ("min" in rangeSpeed) {
          this.speed.load({ angle: rangeSpeed });
        } else {
          this.speed.load(data.speed as IWobbleSpeed);
        }
      }
    }
  }
}
