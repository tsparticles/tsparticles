import type { IBubbleBase } from "./IBubbleBase";
import type { IBubbleDiv } from "./IBubbleDiv";
import type { SingleOrMultiple } from "tsparticles-engine";

/**
 */
export interface IBubble extends IBubbleBase {
    divs?: SingleOrMultiple<IBubbleDiv>;
}
