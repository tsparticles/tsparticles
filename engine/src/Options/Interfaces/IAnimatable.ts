import type { IAnimation } from "./IAnimation.js";

export interface IAnimatable<T extends IAnimation> {
    animation: T;
}
