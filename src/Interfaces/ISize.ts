import type { SizeAnimationStatus } from "../Enums/SizeAnimationStatus";

export interface ISize {
    status?: SizeAnimationStatus;
    velocity?: number;
    value: number;
}
