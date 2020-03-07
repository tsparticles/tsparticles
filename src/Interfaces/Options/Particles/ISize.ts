import {ISizeAnimation} from "./ISizeAnimation";

export interface ISize {
    /**
     * @deprecated use the new animation instead
     */
    anim: ISizeAnimation;

    animation: ISizeAnimation;
    random: boolean;
    value: number;
}
