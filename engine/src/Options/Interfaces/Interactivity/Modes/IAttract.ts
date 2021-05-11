/**
 * @category Options
 */
import { EasingType } from "../../../../Enums";

export interface IAttract {
    distance: number;
    duration: number;
    easing: EasingType;
    factor: number;
    maxSpeed: number;
    speed: number;
}
