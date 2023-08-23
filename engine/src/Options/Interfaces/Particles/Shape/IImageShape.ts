import type { IShapeValues } from "./IShapeValues";

/**
 */
export interface IImageShape extends IShapeValues {
    gif: boolean;
    height: number;
    replaceColor: boolean;
    src: string;
    width: number;
}
