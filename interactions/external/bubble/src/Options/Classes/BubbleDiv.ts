import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import type { IBubbleDiv } from "../Interfaces/IBubbleDiv.js";

/** Bubble div options class */
export class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
  /** CSS selectors for the div elements */
  selectors: SingleOrMultiple<string> = [];
  /** @inheritDoc */

  /** @inheritDoc */
  override load(data?: RecursivePartial<IBubbleDiv>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    loadProperty(this, "selectors", data.selectors);
  }
}
