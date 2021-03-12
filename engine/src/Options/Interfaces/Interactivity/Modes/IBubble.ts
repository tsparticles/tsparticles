import type { SingleOrMultiple } from "../../../../Types";
import type { IBubbleDiv } from "./IBubbleDiv";
import type { IBubbleBase } from "./IBubbleBase";

/**
 * @category Options
 */
export interface IBubble extends IBubbleBase {
    divs?: SingleOrMultiple<IBubbleDiv>;
}
