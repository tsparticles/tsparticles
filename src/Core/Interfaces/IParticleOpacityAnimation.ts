import type { OpacityAnimationStatus } from "../../Enums";

export interface IParticleOpacityAnimation {
    value: number;
    status?: OpacityAnimationStatus;
    velocity?: number;
}
