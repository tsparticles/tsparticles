import { type IOptionLoader, type RecursivePartial, isNull, isNumber, loadProperty } from "@tsparticles/engine";
import type { IAbsorberSplit } from "../Interfaces/IAbsorberSplit.js";

const defaultQuantity = 4,
  minQuantity = 0,
  maxQuantity = 1000;

/**
 * Absorber split options, used for splitting an absorber when it reaches its size limits
 */
export class AbsorberSplit implements IAbsorberSplit, IOptionLoader<IAbsorberSplit> {
  enable = false;
  quantity = defaultQuantity;

  /**
   * Loads the absorber split options from the given data, invalid quantities keep the current value
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IAbsorberSplit>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);

    const quantity = data.quantity;

    if (isNumber(quantity) && Number.isFinite(quantity)) {
      this.quantity = Math.min(Math.max(Math.trunc(quantity), minQuantity), maxQuantity);
    }
  }
}
