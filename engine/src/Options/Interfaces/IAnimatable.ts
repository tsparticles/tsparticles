import type { IAnimation } from "./IAnimation.js";

export interface IAnimatable<T extends IAnimation> {
    /**
     * The animation property
     */
    animation: T;
}
