import type {
    GradientType,
    IParticleHslAnimation,
    IParticleNumericValueAnimation,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    SingleOrMultiple,
} from "@tsparticles/engine";
import type { AnimatableGradient } from "./Options/Classes/AnimatableGradient.js";
import type { IAnimatableGradient } from "./Options/Interfaces/IAnimatableGradient.js";

export interface IParticleGradientColorAnimation {
    opacity?: IParticleNumericValueAnimation;
    stop: number;
    value: IParticleHslAnimation;
}

export interface IParticleGradientAnimation {
    angle: IParticleNumericValueAnimation;
    colors: IParticleGradientColorAnimation[];
    type: GradientType;
}

export type GradientParticle = Particle & {
    /**
     * Gets the particle gradient options
     */
    gradient?: IParticleGradientAnimation;
    options: GradientParticlesOptions;
};

export type IGradientParticlesOptions = IParticlesOptions & {
    gradient?: SingleOrMultiple<IAnimatableGradient>;
};

export type GradientParticlesOptions = ParticlesOptions & {
    gradient?: SingleOrMultiple<AnimatableGradient>;
};
