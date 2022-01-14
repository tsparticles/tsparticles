import type { IBubbleBase } from "./IBubbleBase";
import type { IBubbleDiv } from "./IBubbleDiv";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * @category Options
 */
export interface IBubble extends IBubbleBase {
    divs?: SingleOrMultiple<IBubbleDiv>;
}
