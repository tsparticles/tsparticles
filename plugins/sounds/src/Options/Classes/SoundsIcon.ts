import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ISoundsIcon } from "../Interfaces/ISoundsIcon.js";

export class SoundsIcon implements ISoundsIcon, IOptionLoader<ISoundsIcon> {
  height = 24;
  path?: string;
  style = "";
  svg?: string;
  width = 24;

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
