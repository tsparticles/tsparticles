import { maxZoom, minZoom } from "../../Core/Utils/Constants.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IZoom } from "../Interfaces/IZoom.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { isNull } from "../../Utils/TypeUtils.js";

export class Zoom implements IZoom, IOptionLoader<IZoom> {
  enable;
  max;
  min;

  constructor() {
    this.enable = false;
    this.min = minZoom;
    this.max = maxZoom;
  }

  load(data?: RecursivePartial<IZoom>): void {
    if (isNull(data)) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.min !== undefined) {
      this.min = data.min;
    }

    if (data.max !== undefined) {
      this.max = data.max;
    }
  }
}
