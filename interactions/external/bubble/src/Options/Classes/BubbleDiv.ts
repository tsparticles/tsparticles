import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple, isNull } from "@tsparticles/engine";
import { BubbleBase } from "./BubbleBase.js";
import type { IBubbleDiv } from "../Interfaces/IBubbleDiv.js";

/** Bubble div options class */
export class BubbleDiv extends BubbleBase implements IBubbleDiv, IOptionLoader<IBubbleDiv> {
  /** CSS selectors for the div elements */
  selectors: SingleOrMultiple<string>;

  /** @inheritDoc */
  constructor() {
    super();

    this.selectors = [];
  }

  /** @inheritDoc */
  override load(data?: RecursivePartial<IBubbleDiv>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }
}
