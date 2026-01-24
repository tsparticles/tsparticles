import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple, isNull } from "@tsparticles/engine";
import type { IClickEvent } from "../../Interfaces/Events/IClickEvent.js";

/**
 * [[include:Options/Interactivity/Click.md]]
 */
export class ClickEvent implements IClickEvent, IOptionLoader<IClickEvent> {
  /**
   * The click event handler enabling setting
   */
  enable;

  /**
   * Click modes used by the event
   */
  mode: SingleOrMultiple<string>;

  constructor() {
    this.enable = false;
    this.mode = [];
  }

  load(data?: RecursivePartial<IClickEvent>): void {
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
