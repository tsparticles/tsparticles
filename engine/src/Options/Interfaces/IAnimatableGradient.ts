import type { IAnimatableGradientColor, IOptionsGradient } from "./IOptionsGradient";
import type { IGradientAngle } from "../../Core/Interfaces";
import type { IAnimatable } from "./IAnimatable";
import type { IAnimation } from "./IAnimation";
import type { SingleOrMultiple } from "../../Types";

export type IAnimatableGradient = IOptionsGradient & {
    angle: IGradientAngle & IAnimatable<IAnimation>;
    colors: SingleOrMultiple<IAnimatableGradientColor>;
};
