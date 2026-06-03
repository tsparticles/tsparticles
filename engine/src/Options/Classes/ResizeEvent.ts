import type { IResizeEvent } from "../Interfaces/IResizeEvent.js";
import { OptionLoader } from "../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

export class ResizeEvent extends OptionLoader<IResizeEvent> implements IResizeEvent {
  delay;
  enable;

  constructor() {
    super();
    this.delay = 0.5;
    this.enable = true;
  }

  doLoad(data: RecursivePartial<IResizeEvent>): void {
    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
