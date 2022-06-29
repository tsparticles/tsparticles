import type { IShapeValues, SingleOrMultiple } from "tsparticles-engine";

/**
 * @category Options
 */
export interface ICharacterShape extends IShapeValues {
    font: string;
    style: string;
    value: SingleOrMultiple<string>;
    weight: string;
}
