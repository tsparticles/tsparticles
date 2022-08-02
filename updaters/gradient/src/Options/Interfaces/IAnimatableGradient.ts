import type { IAnimatable, IAnimation } from "tsparticles-engine";
import type { IAnimatableGradientColor, IOptionsGradient } from "./IOptionsGradient";
import type { IGradientAngle } from "./Gradients";

export type IAnimatableGradient = IOptionsGradient & {
    angle: IGradientAngle & IAnimatable<IAnimation>;
    colors: IAnimatableGradientColor[];
};
