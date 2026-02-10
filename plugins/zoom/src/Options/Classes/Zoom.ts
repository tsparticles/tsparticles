import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { maxZoom, minZoom } from "../../Utils/Constants.js";
import type { IZoom } from "../Interfaces/IZoom.js";

const defaultZoom = 1;

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

export { defaultZoom, minZoom, maxZoom };
