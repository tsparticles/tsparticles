import type { OpacityAnimationStatus } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IParticleOpacityAnimation {
    value: number;
    status?: OpacityAnimationStatus;
    velocity?: number;
}
