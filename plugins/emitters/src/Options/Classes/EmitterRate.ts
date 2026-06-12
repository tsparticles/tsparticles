import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IEmitterRate } from "../Interfaces/IEmitterRate.js";

/**
 * The emitter rate options
 */
export class EmitterRate implements IEmitterRate, IOptionLoader<IEmitterRate> {
  /**
   * The delay between emissions in seconds
   */
  delay: RangeValue = 0.1;
  /**
   * The quantity of particles emitted per emission event
   */
  quantity: RangeValue = 1;

  /**
   * Loads the emitter rate options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmitterRate>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "quantity", data.quantity);
    loadRangeProperty(this, "delay", data.delay);
  }
}
