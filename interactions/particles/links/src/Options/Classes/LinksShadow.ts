import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILinksShadow } from "../Interfaces/ILinksShadow.js";

/** Links shadow options class */
export class LinksShadow implements ILinksShadow, IOptionLoader<ILinksShadow> {
  /** Shadow blur radius */
  blur = 5;
  /** Shadow color */
  color = new OptionsColor();
  /** Enables link shadow */
  enable = false;

  constructor() {
    this.color.value = "#000";
  }

  load(data?: RecursivePartial<ILinksShadow>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "blur", data.blur);

    this.color = OptionsColor.create(this.color, data.color);

    loadProperty(this, "enable", data.enable);
  }
}
