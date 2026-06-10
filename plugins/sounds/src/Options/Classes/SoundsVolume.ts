import { type IOptionLoader, type RecursivePartial, isNull, isObject, loadProperty } from "@tsparticles/engine";
import type { ISoundsVolume } from "../Interfaces/ISoundsVolume.js";

export class SoundsVolume implements ISoundsVolume, IOptionLoader<ISoundsVolume> {
  /** The maximum volume */
  max = 100;
  /** The minimum volume */
  min = 0;
  /** The volume step */
  step = 10;
  /** The default volume */
  value = 100;

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
