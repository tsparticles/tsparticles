import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IWobbleSpeed } from "../Interfaces/IWobbleSpeed.js";

/** Wobble speed options class */
export class WobbleSpeed implements IWobbleSpeed, IOptionLoader<IWobbleSpeed> {
  /** Wobble speed angle */
  angle: RangeValue;
  /** Wobble speed movement */
  move: RangeValue;

  /** WobbleSpeed constructor */
  constructor() {
    this.angle = 50;
    this.move = 10;
  }

  /**
   * Loads the wobble speed from data
   * @param data
   */
  load(data?: RecursivePartial<IWobbleSpeed>): void {
    if (isNull(data)) {
      return;
    }

    if (data.angle !== undefined) {
      this.angle = setRangeValue(data.angle);
    }

    if (data.move !== undefined) {
      this.move = setRangeValue(data.move);
    }
  }
}
