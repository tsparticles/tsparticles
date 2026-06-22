import {
  type BackgroundDrawContext,
  type IDelta,
  type IOptionLoader,
  OptionsColor,
  type RecursivePartial,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
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
   * Custom draw callback for dynamic mask
   */
  draw?: (context: BackgroundDrawContext, delta: IDelta) => void;
  /**
   * External element or CSS selector for dynamic mask source
   */
  element?: string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement;
  /**
   * The background image hiding all elements behind
   */
  image?: string;
  /**
   * The opacity of the background
   */
  opacity = 1;

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

    loadProperty(this, "draw", data.draw as typeof this.draw);
    loadProperty(this, "element", data.element);
    loadProperty(this, "image", data.image);
    loadProperty(this, "opacity", data.opacity);
  }
}
