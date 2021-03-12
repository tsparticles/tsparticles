import type { IAnimation } from "./IAnimation";

export interface IAnimatable<T extends IAnimation> {
    animation: T;
}
