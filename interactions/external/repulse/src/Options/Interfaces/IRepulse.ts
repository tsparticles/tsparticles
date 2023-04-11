import type { IRepulseBase } from "./IRepulseBase";
import type { IRepulseDiv } from "./IRepulseDiv";
import type { SingleOrMultiple } from "tsparticles-engine";

/**
 
 */
export interface IRepulse extends IRepulseBase {
    divs?: SingleOrMultiple<IRepulseDiv>;
}
