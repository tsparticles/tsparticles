import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IHoverEvent } from "../../Interfaces/Events/IHoverEvent.js";

/**
 * [[include:Options/Interactivity/Hover.md]]
 */
export class HoverEvent implements IHoverEvent, IOptionLoader<IHoverEvent> {
  enable = false;
  mode: SingleOrMultiple<string> = [];

  load(data?: RecursivePartial<IHoverEvent>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "mode", data.mode);
  }
}
