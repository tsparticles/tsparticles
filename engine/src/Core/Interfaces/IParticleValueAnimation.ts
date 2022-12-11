import type { AnimationStatus } from "../../Enums/AnimationStatus";

/**
 * @category Interfaces
 */
export interface IParticleValueAnimation<T> {
    decay?: number;
    enable: boolean;
    initialValue?: number;
    loops?: number;
    maxLoops?: number;
    status?: AnimationStatus;
    value: T;
    velocity?: number;
}

export interface IParticleNumericValueAnimation extends IParticleValueAnimation<number> {
    max: number;
    min: number;
}
