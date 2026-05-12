import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IBackgroundMaskCover } from "../Interfaces/IBackgroundMaskCover.js";

/**
 * The background mask cover options
 */
export class BackgroundMaskCover implements IBackgroundMaskCover, IOptionLoader<IBackgroundMaskCover> {
  /**
   * The background color hiding all elements behind
   */
  color?: OptionsColor;
  /**
   * The background image hiding all elements behind
   */
  image?: string;
  /**
   * The opacity of the background
   */
  opacity;

  constructor() {
    this.opacity = 1;
  }

  /**
   * Loads the background mask cover options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IBackgroundMaskCover>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.image !== undefined) {
      this.image = data.image;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
