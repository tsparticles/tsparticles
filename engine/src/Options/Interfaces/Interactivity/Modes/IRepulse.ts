import type { IRepulseBase } from "./IRepulseBase";
import type { IRepulseDiv } from "./IRepulseDiv";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Options
 */
export interface IRepulse extends IRepulseBase {
    divs?: SingleOrMultiple<IRepulseDiv>;
}
