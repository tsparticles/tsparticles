import type { AnimationStatus } from "../../Enums/AnimationStatus.js";

/**
 */
export interface IParticleValueAnimation<T> {
    decay?: number;
    delayTime?: number;
    enable: boolean;
    initialValue?: number;
    loops?: number;
    maxLoops?: number;
    status?: AnimationStatus;
    time?: number;
    value: T;
    velocity?: number;
}

export interface IParticleNumericValueAnimation extends IParticleValueAnimation<number> {
    max: number;
    min: number;
}
