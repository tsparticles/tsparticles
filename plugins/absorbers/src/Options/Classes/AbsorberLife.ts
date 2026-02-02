import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IAbsorberLife } from "../Interfaces/IAbsorberLife.js";

/**
 */
export class AbsorberLife implements IAbsorberLife, IOptionLoader<IAbsorberLife> {
  count?: number;
  delay?: RangeValue;
  duration?: RangeValue;
  wait;

  constructor() {
    this.wait = false;
  }

  load(data?: RecursivePartial<IAbsorberLife>): void {
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
