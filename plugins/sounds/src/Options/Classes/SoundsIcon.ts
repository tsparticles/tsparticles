import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ISoundsIcon } from "../Interfaces/ISoundsIcon.js";

export class SoundsIcon implements ISoundsIcon, IOptionLoader<ISoundsIcon> {
  height;
  path?: string;
  style: string;
  svg?: string;
  width;

  constructor() {
    this.width = 24;
    this.height = 24;
    this.style = "";
  }

  load(data?: RecursivePartial<ISoundsIcon>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "path", data.path);
    loadProperty(this, "svg", data.svg);
    loadProperty(this, "width", data.width);
    loadProperty(this, "height", data.height);
  }
}
