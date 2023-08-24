import type {
    GradientType,
    IParticleHslAnimation,
    IParticleNumericValueAnimation,
    IParticleValueAnimation,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    SingleOrMultiple,
} from "@tsparticles/engine";
import type { AnimatableGradient } from "./Options/Classes/AnimatableGradient";
import type { IAnimatableGradient } from "./Options/Interfaces/IAnimatableGradient";

export interface IParticleGradientColorAnimation {
    opacity?: IParticleNumericValueAnimation;
    stop: number;
    value: IParticleHslAnimation;
}

export interface IParticleGradientAnimation {
    angle: IParticleValueAnimation<number>;
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
