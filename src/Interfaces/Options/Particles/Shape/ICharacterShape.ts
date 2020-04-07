import type { IOptionLoader } from "../../IOptionLoader";
import type { IShapeValues } from "./IShapeValues";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface ICharacterShape extends IShapeValues, IOptionLoader<ICharacterShape> {
    value: SingleOrMultiple<string>;
    font: string;
    style: string;
    weight: string;
}
