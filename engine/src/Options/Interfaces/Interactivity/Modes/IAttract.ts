/**
 * @category Options
 */
import { EasingType } from "../../../../Enums/Types/EasingType";

export interface IAttract {
    distance: number;
    duration: number;
    easing: EasingType;
    factor: number;
    maxSpeed: number;
    speed: number;
}
