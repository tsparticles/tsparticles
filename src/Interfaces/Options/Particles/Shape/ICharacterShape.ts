import type { IOptionLoader } from "../../IOptionLoader";
import type { IShapeValues } from "./IShapeValues";

export interface ICharacterShape extends IShapeValues, IOptionLoader<ICharacterShape> {
    value: string | string[];
    font: string;
    style: string;
    weight: string;
}
