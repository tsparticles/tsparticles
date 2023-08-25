import type { TiltDirection, TiltDirectionAlt } from "../../TiltDirection.js";
import type { ITiltAnimation } from "./ITiltAnimation.js";
import type { IValueWithRandom } from "@tsparticles/engine";

/**
 * [[include:Options/Particles/Rotate.md]]
 */
export interface ITilt extends IValueWithRandom {
    animation: ITiltAnimation;
    direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
    enable: boolean;
}
