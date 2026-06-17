import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
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
  wait = false;

  /**
   * Loads the emitter life options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmitterLife>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "count", data.count);
    loadRangeProperty(this, "delay", data.delay);
    loadRangeProperty(this, "duration", data.duration);
    loadProperty(this, "wait", data.wait);
  }
}
