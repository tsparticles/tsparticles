import type { IShapeValues } from "./IShapeValues";

/**
 */
export interface IImageShape extends IShapeValues {
    gif: boolean;
    height: number;

    replaceColor: boolean;

    /**
     * @deprecated use the new replaceColor instead
     */
    replace_color: boolean;

    src: string;
    width: number;
}
