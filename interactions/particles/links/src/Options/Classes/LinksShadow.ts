import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILinksShadow } from "../Interfaces/ILinksShadow.js";

/** Links shadow options class */
export class LinksShadow implements ILinksShadow, IOptionLoader<ILinksShadow> {
  /** Shadow blur radius */
  blur;
  /** Shadow color */
  color;
  /** Enables link shadow */
  enable;

  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.color.value = "#000";
    this.enable = false;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ILinksShadow>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "blur", data.blur);

    this.color = OptionsColor.create(this.color, data.color);

    loadProperty(this, "enable", data.enable);
  }
}
