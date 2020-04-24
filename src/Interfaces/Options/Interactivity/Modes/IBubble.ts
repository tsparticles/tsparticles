import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../IColor";
import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface IBubble extends IOptionLoader<IBubble> {
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
    color?: SingleOrMultiple<IColor | string>;
}
