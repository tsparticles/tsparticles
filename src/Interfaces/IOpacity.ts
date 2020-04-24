import { OpacityAnimationStatus } from "../Enums/OpacityAnimationStatus";

export interface IOpacity {
    value: number;
    status?: OpacityAnimationStatus;
    velocity?: number;
}
