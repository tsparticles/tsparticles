import type { IShapeValues, SingleOrMultiple } from "tsparticles-engine";

/**
 * @category Options
 */
export interface ICharacterShape extends IShapeValues {
    value: SingleOrMultiple<string>;
    font: string;
    style: string;
    weight: string;
}
