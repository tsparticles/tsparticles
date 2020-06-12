import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IBubbleBase } from "./IBubbleBase";

export interface IBubbleDiv extends IOptionLoader<IBubbleDiv>, IBubbleBase {
    ids: SingleOrMultiple<string>;
}
