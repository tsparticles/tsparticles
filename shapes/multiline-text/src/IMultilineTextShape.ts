import type { IShapeValues, SingleOrMultiple } from "tsparticles-engine";

export interface IMultilineTextShape extends IShapeValues {
    value: SingleOrMultiple<string>;
    font: string;
    style: string;
    weight: string;
}
