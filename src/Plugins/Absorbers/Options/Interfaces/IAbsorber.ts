import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IColor } from "../../../../Core/Interfaces/IColor";
import type { IAbsorberSize } from "./IAbsorberSize";

/**
 * Absorber options
 */
export interface IAbsorber extends IOptionLoader<IAbsorber> {
    /**
     * Absorber color
     */
    color: IColor | string;

    /**
     * Absorber opacity
     */
    opacity: number;

    /**
     * Absorber position, percent values calculated on canvas size
     */
    position?: ICoordinates;

    /**
     * Absorber size, these values will be used as pixels
     */
    size: IAbsorberSize;
}
