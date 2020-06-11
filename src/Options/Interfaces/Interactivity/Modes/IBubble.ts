import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IBubbleDiv } from "./IBubbleDiv";
import { IBubbleBase } from "./IBubbleBase";

export interface IBubble extends IOptionLoader<IBubble>, IBubbleBase {
    divs?: SingleOrMultiple<IBubbleDiv>;
}
