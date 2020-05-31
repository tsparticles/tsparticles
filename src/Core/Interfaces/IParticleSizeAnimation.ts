import type { SizeAnimationStatus } from "../../Enums";

export interface IParticleSizeAnimation {
    status?: SizeAnimationStatus;
    velocity?: number;
    value: number;
}
