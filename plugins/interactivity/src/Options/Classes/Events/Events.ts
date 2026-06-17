import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  executeOnSingleOrMultiple,
  isNull,
} from "@tsparticles/engine";
import { ClickEvent } from "./ClickEvent.js";
import { DivEvent } from "./DivEvent.js";
import { HoverEvent } from "./HoverEvent.js";
import type { IEvents } from "../../Interfaces/Events/IEvents.js";

/**
 * [[include:Options/Interactivity/Events.md]]
 */
export class Events implements IEvents, IOptionLoader<IEvents> {
  readonly onClick = new ClickEvent();
  onDiv: SingleOrMultiple<DivEvent> = new DivEvent();
  readonly onHover = new HoverEvent();

  load(data?: RecursivePartial<IEvents>): void {
    if (isNull(data)) {
      return;
    }

    this.onClick.load(data.onClick);

    const onDiv = data.onDiv;

    if (onDiv !== undefined) {
      this.onDiv = executeOnSingleOrMultiple(onDiv, t => {
        const tmp = new DivEvent();

        tmp.load(t);

        return tmp;
      });
    }

    this.onHover.load(data.onHover);
  }
}
