import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";
import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface IBubbleDiv extends IOptionLoader<IBubbleDiv> {
    ids: SingleOrMultiple<string>;
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
    color?: SingleOrMultiple<IColor | string>;
}
