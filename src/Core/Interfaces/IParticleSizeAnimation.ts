import type { SizeAnimationStatus } from "../../Enums/SizeAnimationStatus";

export interface IParticleSizeAnimation {
    status?: SizeAnimationStatus;
    velocity?: number;
    value: number;
}
