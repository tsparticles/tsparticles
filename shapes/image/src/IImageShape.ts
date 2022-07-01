import type { IShapeValues } from "tsparticles-engine";

export interface IImageShape extends IShapeValues {
    height: number;
    replaceColor: boolean;
    src: string;
    width: number;
}
