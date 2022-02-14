import type { IShapeValues } from "tsparticles-engine";

export interface IImageShape extends IShapeValues {
    replaceColor: boolean;
    src: string;
    width: number;
    height: number;
}
