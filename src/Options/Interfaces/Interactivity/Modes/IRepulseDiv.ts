import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IRepulseBase } from "./IRepulseBase";

export interface IRepulseDiv extends IOptionLoader<IRepulseDiv>, IRepulseBase {
    ids: SingleOrMultiple<string>;
}
