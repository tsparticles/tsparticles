import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import { DivType } from "../../../Enums/DivType.js";
import type { IDivEvent } from "../../Interfaces/Events/IDivEvent.js";

/**
 * [[include:Options/Interactivity/Div.md]]
 */
export class DivEvent implements IDivEvent, IOptionLoader<IDivEvent> {
  /**
   * The div event handler enabling mode
   */
  enable = false;
  /**
   * Div mode values used by the event
   */
  mode: SingleOrMultiple<string> = [];
  selectors: SingleOrMultiple<string> = [];
  type: DivType | keyof typeof DivType = DivType.circle;

  load(data?: RecursivePartial<IDivEvent>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "selectors", data.selectors);
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "type", data.type);
  }
}
