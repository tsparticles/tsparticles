import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ICanvasMaskOverride } from "../Interfaces/ICanvasMaskOverride.js";

/**
 * The canvas mask override options
 */
export class CanvasMaskOverride implements ICanvasMaskOverride, IOptionLoader<ICanvasMaskOverride> {
  /**
   * Override the particle color with the canvas pixel color
   */
  color: boolean;
  /**
   * Override the particle opacity with the canvas pixel opacity
   */
  opacity: boolean;

  constructor() {
    this.color = true;
    this.opacity = false;
  }

  /**
   * Loads the canvas mask override options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<ICanvasMaskOverride>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = data.color;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
