import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IColorTransitionStop } from "../Interfaces/IColorTransitions.js";

/** Color transition stop options class */
export class ColorTransitionStop implements IColorTransitionStop, IOptionLoader<IColorTransitionStop> {
  /** The stop position in the transition, between 0 and 1 */
  offset = 0;
  /** The stop color */
  value = new OptionsColor();

  /**
   * Loads the color transition stop from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IColorTransitionStop>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "offset", data.offset);

    this.value = OptionsColor.create(this.value, data.value);
  }
}
