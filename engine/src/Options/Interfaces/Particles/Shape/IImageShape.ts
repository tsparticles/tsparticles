import type { IShapeValues } from "./IShapeValues";

/**
 * @category Options
 */
export interface IImageShape extends IShapeValues {
    replaceColor: boolean;
    src: string;
    width: number;
    height: number;
}
