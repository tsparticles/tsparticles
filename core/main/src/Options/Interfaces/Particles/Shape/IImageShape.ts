import type { IShapeValues } from "./IShapeValues";

export interface IImageShape extends IShapeValues {
    /**
     * @deprecated use the new replaceColor instead
     */
    replace_color: boolean;

    replaceColor: boolean;

    src: string;
    width: number;
    height: number;
}
