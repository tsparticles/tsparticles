import type { IAnimatable, IAnimation } from "@tsparticles/engine";
import type { IAnimatableGradientColor, IOptionsGradient } from "./IOptionsGradient.js";
import type { IGradientAngle } from "./Gradients.js";

export type IAnimatableGradient = IOptionsGradient & {
  angle: IGradientAngle & IAnimatable<IAnimation>;
  colors: IAnimatableGradientColor[];
};
