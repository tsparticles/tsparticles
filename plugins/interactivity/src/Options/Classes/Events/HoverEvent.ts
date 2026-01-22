import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple, isNull } from "@tsparticles/engine";
import type { IHoverEvent } from "../../Interfaces/Events/IHoverEvent.js";

/**
 * [[include:Options/Interactivity/Hover.md]]
 */
export class HoverEvent implements IHoverEvent, IOptionLoader<IHoverEvent> {
  enable;
  mode: SingleOrMultiple<string>;

  constructor() {
    this.enable = false;
    this.mode = [];
  }

  load(data?: RecursivePartial<IHoverEvent>): void {
    if (isNull(data)) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
  }
}
