import type { IParticleValueAnimation } from "./IParticleValueAnimation";
import type { GradientType } from "../../Enums";
import { IParticleGradientColorAnimation } from "./IParticleGradientColorAnimation";

export interface IParticleGradientAnimation {
    angle: IParticleValueAnimation<number>;
    type: GradientType;
    colors: IParticleGradientColorAnimation;
}
