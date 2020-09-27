import type { AnimationStatus } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IParticleValueAnimation<T> {
    status?: AnimationStatus;
    velocity?: number;
    value: T;
}
