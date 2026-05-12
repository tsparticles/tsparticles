import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  executeOnSingleOrMultiple,
  isNull,
} from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import { BubbleDiv } from "./BubbleDiv.js";
import type { IBubble } from "../Interfaces/IBubble.js";

/** Bubble mode options class */
export class Bubble extends BubbleBase implements IBubble, IOptionLoader<IBubble> {
  /** Bubble divs to apply the mode to */
  divs?: SingleOrMultiple<BubbleDiv>;

  /** @inheritDoc */
  override load(data?: RecursivePartial<IBubble>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    this.divs = executeOnSingleOrMultiple(data.divs, div => {
      const tmp = new BubbleDiv();

      tmp.load(div);

      return tmp;
    });
  }
}
