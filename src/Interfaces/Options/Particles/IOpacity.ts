import {IOpacityAnimation} from "./IOpacityAnimation";

export interface IOpacity {
    value: number;
    random: boolean;

    /**
     * @deprecated use the new animation instead
     */
    anim: IOpacityAnimation;

    animation: IOpacityAnimation;
}
