import { type IOptionLoader, type RecursivePartial, isNull, isObject, loadProperty } from "@tsparticles/engine";
import type { ISoundsVolume } from "../Interfaces/ISoundsVolume.js";

export class SoundsVolume implements ISoundsVolume, IOptionLoader<ISoundsVolume> {
  /** The maximum volume */
  max: number;
  /** The minimum volume */
  min: number;
  /** The volume step */
  step: number;
  /** The default volume */
  value: number;

  constructor() {
    this.value = 100;
    this.max = 100;
    this.min = 0;
    this.step = 10;
  }

  load(data?: RecursivePartial<ISoundsVolume | number>): void {
    if (isNull(data)) {
      return;
    }

    if (isObject(data)) {
      loadProperty(this, "max", data.max);
      loadProperty(this, "min", data.min);
      loadProperty(this, "step", data.step);

      if (data.value !== undefined) {
        this.value = data.value;
      }
    } else {
      this.value = data;
    }
  }
}
