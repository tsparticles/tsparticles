import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IAbsorberSplit } from "../Interfaces/IAbsorberSplit.js";

/**
 * Absorber split options
 */
export class AbsorberSplit implements IAbsorberSplit, IOptionLoader<IAbsorberSplit> {
  enable = false;
  quantity = 4;

  load(data?: RecursivePartial<IAbsorberSplit>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "quantity", data.quantity);
  }
}
