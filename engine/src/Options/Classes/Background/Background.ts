import type { BackgroundDrawContext, IBackground } from "../../Interfaces/Background/IBackground.js";
import { OptionLoader, loadProperty } from "../../../Utils/OptionsUtils.js";
import type { IDelta } from "../../../Core/Interfaces/IDelta.js";
import { OptionsColor } from "../OptionsColor.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Background.md]]
 */
export class Background extends OptionLoader<IBackground> implements IBackground {
  color: OptionsColor;
  draw?: (context: BackgroundDrawContext, delta: IDelta) => void;
  element?: string | HTMLCanvasElement | OffscreenCanvas;
  image = "";
  opacity = 1;
  position = "";
  repeat = "";
  size = "";

  constructor() {
    super();
    this.color = new OptionsColor();
    this.color.value = "";
  }

  protected doLoad(data: RecursivePartial<IBackground>): void {
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "element", data.element);
    this.draw = data.draw as typeof this.draw;
    loadProperty(this, "image", data.image);
    loadProperty(this, "position", data.position);
    loadProperty(this, "repeat", data.repeat);
    loadProperty(this, "size", data.size);
    loadProperty(this, "opacity", data.opacity);
  }
}
