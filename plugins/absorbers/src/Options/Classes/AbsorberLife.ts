import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
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

    loadProperty(this, "count", data.count);
    loadRangeProperty(this, "delay", data.delay);
    loadRangeProperty(this, "duration", data.duration);
    loadProperty(this, "wait", data.wait);
  }
}
