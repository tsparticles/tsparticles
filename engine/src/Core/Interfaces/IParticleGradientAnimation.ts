import type { GradientType } from "../../Enums/Types/GradientType";
import type { IParticleGradientColorAnimation } from "./IParticleGradientColorAnimation";
import type { IParticleValueAnimation } from "./IParticleValueAnimation";

export interface IParticleGradientAnimation {
    angle: IParticleValueAnimation<number>;
    type: GradientType;
    colors: IParticleGradientColorAnimation[];
}
