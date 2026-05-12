import type { IBubbleBase } from "./IBubbleBase.js";
import type { IBubbleDiv } from "./IBubbleDiv.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/** The bubble mode options */
export interface IBubble extends IBubbleBase {
  /** The bubble divs options */
  divs?: SingleOrMultiple<IBubbleDiv>;
}
