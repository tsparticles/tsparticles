import {
  type IColor,
  type IOptionLoader,
  type RecursivePartial,
  isNull,
  isString,
  loadProperty,
} from "@tsparticles/engine";
import { BackgroundMaskCover } from "./BackgroundMaskCover.js";
import type { IBackgroundMask } from "../Interfaces/IBackgroundMask.js";
import type { IBackgroundMaskCover } from "../Interfaces/IBackgroundMaskCover.js";

/**
 * [[include:Options/BackgroundMask.md]]
 */
export class BackgroundMask implements IBackgroundMask, IOptionLoader<IBackgroundMask> {
  /**
   * Canvas composite operation
   * values here: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvasRenderingContext2D/globalCompositeOperation
   */
  composite: GlobalCompositeOperation;

  /**
   * Background covering color
   */
  readonly cover;

  /**
   * Background mask enabling options
   */
  enable;

  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }

  /**
   * Loads the background mask options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IBackgroundMask>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "composite", data.composite);

    if (data.cover !== undefined) {
      const cover = data.cover as IBackgroundMaskCover,
        color = (isString(data.cover) ? { color: data.cover } : data.cover) as IColor;

      this.cover.load(cover.color !== undefined || cover.image !== undefined ? cover : { color: color });
    }

    loadProperty(this, "enable", data.enable);
  }
}
