import type { SizeAnimationStatus } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IParticleSizeAnimation {
    status?: SizeAnimationStatus;
    velocity?: number;
    value: number;
}
