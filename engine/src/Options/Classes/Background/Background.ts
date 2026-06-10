import { OptionLoader, loadProperty } from "../../../Utils/OptionsUtils.js";
import type { IBackground } from "../../Interfaces/Background/IBackground.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Background.md]]
 */
export class Background extends OptionLoader<IBackground> implements IBackground {
  color;
  image;
  opacity;
  position;
  repeat;
  size;

  constructor() {
    super();
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }

  protected doLoad(data: RecursivePartial<IBackground>): void {
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "image", data.image);
    loadProperty(this, "position", data.position);
    loadProperty(this, "repeat", data.repeat);
    loadProperty(this, "size", data.size);
    loadProperty(this, "opacity", data.opacity);
  }
}
