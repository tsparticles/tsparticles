import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IClickEvent } from "../../Interfaces/Events/IClickEvent.js";

/**
 * [[include:Options/Interactivity/Click.md]]
 */
export class ClickEvent implements IClickEvent, IOptionLoader<IClickEvent> {
  /**
   * The click event handler enabling setting
   */
  enable = false;
  /**
   * Click modes used by the event
   */
  mode: SingleOrMultiple<string> = [];

  load(data?: RecursivePartial<IClickEvent>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "mode", data.mode);
  }
}
