import {
  type IOptionLoader,
  type IRangeValue,
  type RangeValue,
  type RecursivePartial,
  isNull,
  isNumber,
  setRangeValue,
} from "@tsparticles/engine";
import type { IWobble } from "../Interfaces/IWobble.js";
import type { IWobbleSpeed } from "../Interfaces/IWobbleSpeed.js";
import { WobbleSpeed } from "./WobbleSpeed.js";

/** Wobble options class */
export class Wobble implements IWobble, IOptionLoader<IWobble> {
  /** Wobble distance */
  distance: RangeValue;
  /** Enables the wobble */
  enable: boolean;
  /** Wobble speed */
  speed: WobbleSpeed;

  /** Wobble constructor */
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = new WobbleSpeed();
  }

  /**
   * Loads the wobble options from data
   * @param data
   */
  load(data?: RecursivePartial<IWobble>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = setRangeValue(data.distance);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

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
