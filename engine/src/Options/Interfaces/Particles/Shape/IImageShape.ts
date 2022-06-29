import type { IShapeValues } from "./IShapeValues";

/**
 * @category Options
 */
export interface IImageShape extends IShapeValues {
    height: number;

    replaceColor: boolean;

    /**
     * @deprecated use the new replaceColor instead
     */
    replace_color: boolean;

    src: string;
    width: number;
}
