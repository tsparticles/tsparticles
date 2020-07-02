import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IBubbleDiv } from "./IBubbleDiv";
import type { IBubbleBase } from "./IBubbleBase";

export interface IBubble extends IBubbleBase {
    divs?: SingleOrMultiple<IBubbleDiv>;
}
