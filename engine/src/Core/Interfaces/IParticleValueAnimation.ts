import type { AnimationStatus } from "../../Enums/AnimationStatus";

/**
 * @category Interfaces
 */
export interface IParticleValueAnimation<T> {
    enable: boolean;
    status?: AnimationStatus;
    velocity?: number;
    value: T;
    loops?: number;
    maxLoops?: number;
}

export interface IParticleNumericValueAnimation extends IParticleValueAnimation<number> {
    min: number;
    max: number;
}

export interface IParticleTiltValueAnimation extends IParticleValueAnimation<number> {
    sinDirection: number;
    cosDirection: number;
}
