import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IGrabLinks } from "../Interfaces/IGrabLinks.js";

/** Grab links options class */
export class GrabLinks implements IGrabLinks, IOptionLoader<IGrabLinks> {
  /** Whether to blink the grab line */
  blink;

  /** Grab line color */
  color?: OptionsColor;

  /** Whether the user consented to the grab link */
  consent;

  /** Grab line opacity */
  opacity;

  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IGrabLinks>): void {
    if (isNull(data)) {
      return;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
