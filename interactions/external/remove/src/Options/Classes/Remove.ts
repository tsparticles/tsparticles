import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IRemove } from "../Interfaces/IRemove.js";

/** Remove mode options class */
export class Remove implements IRemove, IOptionLoader<IRemove> {
  /** Number of particles to remove */
  quantity: RangeValue;

  constructor() {
    this.quantity = 2;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IRemove>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "quantity", data.quantity);
  }
}
