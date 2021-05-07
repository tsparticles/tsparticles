import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IColor } from "../../../../Core/Interfaces/Colors";
import { RecursivePartial } from "../../../../Types";
import { IValueWithRandom } from "../../../../Options/Interfaces/IValueWithRandom";

/**
 * Absorber options
 * [[include:Options/Plugins/Absorbers.md]]
 * @category Absorbers Plugin
 */
export interface IRepulser {
    /**
     * Absorber color
     */
    color: IColor | string;

    /**
     * Absorber name
     */
    name?: string;

    /**
     * Absorber opacity
     */
    opacity: number;

    /**
     * Absorber position, percent values calculated on canvas size
     */
    position?: RecursivePartial<ICoordinates>;

    /**
     * Absorber size, these values will be used as pixels
     */
    size: IValueWithRandom;

    /**
     * Absorber draggable, this enables dragging on absorbers
     */
    draggable: boolean;
}
