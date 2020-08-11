import type { SingleOrMultiple } from "../../../../Types";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IBubbleBase {
    color?: SingleOrMultiple<IColor | string>;
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
}
