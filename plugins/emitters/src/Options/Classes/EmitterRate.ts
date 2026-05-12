import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IEmitterRate } from "../Interfaces/IEmitterRate.js";

/**
 * The emitter rate options
 */
export class EmitterRate implements IEmitterRate, IOptionLoader<IEmitterRate> {
  /**
   * The delay between emissions in seconds
   */
  delay: RangeValue;
  /**
   * The quantity of particles emitted per emission event
   */
  quantity: RangeValue;

  constructor() {
    this.quantity = 1;
    this.delay = 0.1;
  }

  /**
   * Loads the emitter rate options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmitterRate>): void {
    if (isNull(data)) {
      return;
    }

    if (data.quantity !== undefined) {
      this.quantity = setRangeValue(data.quantity);
    }

    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
  }
}
