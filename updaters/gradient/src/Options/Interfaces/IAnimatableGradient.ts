import type { IAnimatable, IAnimation } from "@tsparticles/engine";
import type { IAnimatableGradientColor, IOptionsGradient } from "./IOptionsGradient.js";
import type { IGradientAngle } from "./Gradients.js";

/** The animatable gradient options */
export type IAnimatableGradient = IOptionsGradient & {
  /** The animatable gradient angle */
  angle: IGradientAngle & IAnimatable<IAnimation>;
  /** The animatable gradient colors */
  colors: IAnimatableGradientColor[];
};
