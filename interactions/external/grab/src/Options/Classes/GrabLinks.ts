import {
  type IOptionLoader,
  OptionsColor,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IGrabLinks } from "../Interfaces/IGrabLinks.js";

/** Grab links options class */
export class GrabLinks implements IGrabLinks, IOptionLoader<IGrabLinks> {
  /** Whether to blink the grab line */
  blink = false;
  /** Grab line color */
  color?: OptionsColor;

  /** Whether the user consented to the grab link */
  consent = false;
  /** Grab line opacity */
  opacity = 1;

  load(data?: RecursivePartial<IGrabLinks>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "blink", data.blink);

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    loadProperty(this, "consent", data.consent);

    loadRangeProperty(this, "opacity", data.opacity);
  }
}
