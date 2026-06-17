import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IWobbleSpeed } from "../Interfaces/IWobbleSpeed.js";

/** Wobble speed options class */
export class WobbleSpeed implements IWobbleSpeed, IOptionLoader<IWobbleSpeed> {
  /** Wobble speed angle */
  angle: RangeValue = 50;
  /** Wobble speed movement */
  move: RangeValue = 10;
  /** WobbleSpeed constructor */

  /**
   * Loads the wobble speed from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IWobbleSpeed>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "angle", data.angle);
    loadRangeProperty(this, "move", data.move);
  }
}
