import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILinksTriangle } from "../Interfaces/ILinksTriangle.js";

/** Links triangle options class */
export class LinksTriangle implements ILinksTriangle, IOptionLoader<ILinksTriangle> {
  /** Triangle fill color */
  color?: OptionsColor;
  /** Enables link triangles */
  enable;
  /** Triangle fill frequency */
  frequency;
  /** Triangle fill opacity */
  opacity?: number;

  constructor() {
    this.enable = false;
    this.frequency = 1;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ILinksTriangle>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "frequency", data.frequency);
    loadProperty(this, "opacity", data.opacity);
  }
}
