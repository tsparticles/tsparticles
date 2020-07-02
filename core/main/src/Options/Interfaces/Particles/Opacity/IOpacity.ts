import type { IOpacityAnimation } from "./IOpacityAnimation";
import type { IOpacityRandom } from "./IOpacityRandom";

export interface IOpacity {
    value: number;
    random: boolean | IOpacityRandom;

    /**
     * @deprecated use the new animation instead
     */
    anim: IOpacityAnimation;

    animation: IOpacityAnimation;
}
