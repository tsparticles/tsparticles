import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IRepulseDiv } from "./IRepulseDiv";
import type { IRepulseBase } from "./IRepulseBase";

export interface IRepulse extends IOptionLoader<IRepulse>, IRepulseBase {
    divs?: SingleOrMultiple<IRepulseDiv>;
}
