import type { IShapeValues } from "tsparticles-engine";

export interface IImageShape extends IShapeValues {
    height: number;
    replaceColor: boolean;

    /*
    @deprecated use replaceColor instead
     */
    replace_color: boolean;

    src: string;
    width: number;
}
