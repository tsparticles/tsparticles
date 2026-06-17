import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILightShadow } from "../Interfaces/ILightShadow.js";

/** Light shadow options class */
export class LightShadow implements ILightShadow, IOptionLoader<ILightShadow> {
  /** The shadow color */
  color = new OptionsColor();

  /** The shadow length */
  length = 2000;

  constructor() {
    this.color.value = "#000000";
  }

  load(data?: RecursivePartial<ILightShadow>): void {
    if (isNull(data)) {
      return;
    }

    this.color = OptionsColor.create(this.color, data.color);

    loadProperty(this, "length", data.length);
  }
}
