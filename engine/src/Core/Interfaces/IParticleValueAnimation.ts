import type { AnimationStatus } from "../../Enums/AnimationStatus";

/**
 * @category Interfaces
 */
export interface IParticleValueAnimation<T> {
    enable: boolean;
    status?: AnimationStatus;
    velocity?: number;
    decay?: number;
    value: T;
    loops?: number;
    maxLoops?: number;
}

export interface IParticleNumericValueAnimation extends IParticleValueAnimation<number> {
    min: number;
    max: number;
}
