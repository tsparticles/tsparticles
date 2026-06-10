import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { maxZoom, minZoom } from "../../Utils/Constants.js";
import type { IZoom } from "../Interfaces/IZoom.js";

const defaultZoom = 1;

/**
 * Zoom options class
 * [[include:Options/Plugins/Zoom.md]]
 */
export class Zoom implements IZoom, IOptionLoader<IZoom> {
  /** Enables or disables zoom interactions */
  enable = false;
  /** Maximum zoom level */
  max = maxZoom;
  /** Minimum zoom level */
  min = minZoom;

  load(data?: RecursivePartial<IZoom>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "min", data.min);
    loadProperty(this, "max", data.max);
  }
}

export { defaultZoom, minZoom, maxZoom };
