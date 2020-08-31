import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IRepulseDiv } from "./IRepulseDiv";
import type { IRepulseBase } from "./IRepulseBase";

/**
 * @category Options
 */
export interface IRepulse extends IRepulseBase {
    divs?: SingleOrMultiple<IRepulseDiv>;
}
