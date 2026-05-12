import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IEmitterLife } from "../Interfaces/IEmitterLife.js";

/**
 * The emitter life options
 */
export class EmitterLife implements IEmitterLife, IOptionLoader<IEmitterLife> {
  /**
   * The count of lives the emitter has
   */
  count?: number;
  /**
   * The delay between spawns
   */
  delay?: RangeValue;
  /**
   * The duration of each emitter life
   */
  duration?: RangeValue;
  /**
   * If enabled the first delay will be applied
   */
  wait;

  constructor() {
    this.wait = false;
  }

  /**
   * Loads the emitter life options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmitterLife>): void {
    if (isNull(data)) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }

    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }

    if (data.wait !== undefined) {
      this.wait = data.wait;
    }
  }
}
