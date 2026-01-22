import type { IBubbleBase } from "./IBubbleBase.js";
import type { IBubbleDiv } from "./IBubbleDiv.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/**
 */
export interface IBubble extends IBubbleBase {
  divs?: SingleOrMultiple<IBubbleDiv>;
}
