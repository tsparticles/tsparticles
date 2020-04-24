import type { ISizeAnimation } from "./ISizeAnimation";
import type { IOptionLoader } from "../../IOptionLoader";
import type { ISizeRandom } from "./ISizeRandom";

export interface ISize extends IOptionLoader<ISize> {
    /**
     * @deprecated use the new animation instead
     */
    anim: ISizeAnimation;

    animation: ISizeAnimation;
    random: boolean | ISizeRandom;
    value: number;
}
