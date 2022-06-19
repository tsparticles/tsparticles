import type { TiltDirection, TiltDirectionAlt } from "../../TiltDirection";
import type { ITiltAnimation } from "./ITiltAnimation";
import type { IValueWithRandom } from "tsparticles-engine";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export interface ITilt extends IValueWithRandom {
    animation: ITiltAnimation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable: boolean;
}
