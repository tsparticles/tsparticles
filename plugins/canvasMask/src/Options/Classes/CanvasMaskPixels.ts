import {
  type IOptionLoader,
  type IRgba,
  type RecursivePartial,
  isFunction,
  isNull,
  isString,
  loadProperty,
} from "@tsparticles/engine";
import type { ICanvasMaskPixels } from "../Interfaces/ICanvasMaskPixels.js";

const minAlpha = 0;

export class CanvasMaskPixels
  implements ICanvasMaskPixels, IOptionLoader<ICanvasMaskPixels>
{
  offset = 4;
  filter: (pixel: IRgba, colorSpace?: "display-p3" | "srgb") => boolean = (
    pixel,
  ): boolean => pixel.a > minAlpha;

  load(data?: RecursivePartial<ICanvasMaskPixels>): void {
    if (isNull(data)) {
      return;
    }

    if (data.filter !== undefined) {
      if (isString(data.filter)) {
        if (data.filter in globalThis) {
          const filter = (
            globalThis as unknown as Record<
              string,
              (pixel: IRgba, colorSpace?: "display-p3" | "srgb") => boolean
            >
          )[data.filter];

          if (isFunction(filter)) {
            this.filter = filter;
          }
        }
      } else {
        this.filter = data.filter;
      }
    }

    loadProperty(this, "offset", data.offset);
  }
}
