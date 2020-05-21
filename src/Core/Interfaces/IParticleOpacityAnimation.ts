import type { OpacityAnimationStatus } from "../../Enums/OpacityAnimationStatus";

export interface IParticleOpacityAnimation {
    value: number;
    status?: OpacityAnimationStatus;
    velocity?: number;
}
