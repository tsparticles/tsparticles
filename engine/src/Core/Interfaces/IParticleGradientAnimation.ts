import type { GradientType } from "../../Enums";
import type { IParticleGradientColorAnimation } from "./IParticleGradientColorAnimation";
import type { IParticleValueAnimation } from "./IParticleValueAnimation";

export interface IParticleGradientAnimation {
    angle: IParticleValueAnimation<number>;
    type: GradientType;
    colors: IParticleGradientColorAnimation[];
}
