import type { AnimationStatus } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IParticleValueAnimation {
    status?: AnimationStatus;
    velocity?: number;
    value: number;
}
