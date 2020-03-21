import type { IOpacityAnimation } from "./IOpacityAnimation";
import type { IOptionLoader } from "../IOptionLoader";

export interface IOpacity extends IOptionLoader<IOpacity> {
    value: number;
    random: boolean;

    /**
     * @deprecated use the new animation instead
     */
    anim: IOpacityAnimation;

    animation: IOpacityAnimation;
}
