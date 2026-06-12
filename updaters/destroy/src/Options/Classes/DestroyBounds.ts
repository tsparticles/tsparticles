import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IDestroyBounds } from "../Interfaces/IDestroyBounds.js";

/** Destroy bounds options class */
export class DestroyBounds implements IDestroyBounds, IOptionLoader<IDestroyBounds> {
  /** Bottom bound */
  bottom?: RangeValue;
  /** Left bound */
  left?: RangeValue;
  /** Right bound */
  right?: RangeValue;
  /** Top bound */
  top?: RangeValue;

  /**
   * Loads the destroy bounds from data
   * @param data
   */
  load(data?: RecursivePartial<IDestroyBounds>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "bottom", data.bottom);
    loadRangeProperty(this, "left", data.left);
    loadRangeProperty(this, "right", data.right);
    loadRangeProperty(this, "top", data.top);
  }
}
