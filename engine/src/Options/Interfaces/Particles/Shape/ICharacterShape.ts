import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * @category Options
 */
export interface ICharacterShape extends IShapeValues {
    value: SingleOrMultiple<string>;
    font: string;
    style: string;
    weight: string;
}
