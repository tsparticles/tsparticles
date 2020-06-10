import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface IRepulseDiv extends IOptionLoader<IRepulseDiv> {
    ids: SingleOrMultiple<string>;
    distance: number;
    duration: number;
    speed: number;
}
