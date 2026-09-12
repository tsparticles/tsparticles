import type { IResizeEvent } from "../Interfaces/IResizeEvent.js";
import { OptionLoader } from "../../Utils/OptionLoader.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { loadProperty } from "../../Utils/OptionsUtils.js";

export class ResizeEvent extends OptionLoader<IResizeEvent> implements IResizeEvent {
  delay = 0.5;
  enable = true;

  protected doLoad(data: RecursivePartial<IResizeEvent>): void {
    loadProperty(this, "delay", data.delay);
    loadProperty(this, "enable", data.enable);
  }
}
