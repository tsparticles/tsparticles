import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { IDestroyBounds } from "../Interfaces/IDestroyBounds.js";

export class DestroyBounds implements IDestroyBounds, IOptionLoader<IDestroyBounds> {
  bottom?: RangeValue;
  left?: RangeValue;
  right?: RangeValue;
  top?: RangeValue;

  load(data?: RecursivePartial<IDestroyBounds>): void {
    if (isNull(data)) {
      return;
    }

    if (data.bottom !== undefined) {
      this.bottom = setRangeValue(data.bottom);
    }

    if (data.left !== undefined) {
      this.left = setRangeValue(data.left);
    }

    if (data.right !== undefined) {
      this.right = setRangeValue(data.right);
    }

    if (data.top !== undefined) {
      this.top = setRangeValue(data.top);
    }
  }
}
