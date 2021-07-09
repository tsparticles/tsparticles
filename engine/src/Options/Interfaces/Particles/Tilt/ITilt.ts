import type { ITiltAnimation } from "./ITiltAnimation";
import type { TiltDirection, TiltDirectionAlt } from "../../../../Enums";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export interface ITilt extends IValueWithRandom {
    animation: ITiltAnimation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable: boolean;
}
