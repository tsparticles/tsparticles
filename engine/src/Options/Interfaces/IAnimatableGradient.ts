import type { IAnimatableGradientColor, IOptionsGradient } from "./IOptionsGradient";
import type { IGradientAngle } from "../../Core/Interfaces";
import type { IAnimatable } from "./IAnimatable";
import type { IAnimation } from "./IAnimation";

export type IAnimatableGradient = IOptionsGradient & {
    angle: IGradientAngle & IAnimatable<IAnimation>;
    colors: IAnimatableGradientColor[];
};
