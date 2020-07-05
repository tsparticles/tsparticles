import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IColor } from "../../../../Core/Interfaces/IColor";
import type { IAbsorberSize } from "./IAbsorberSize";

/**
 * Absorber options
 */
export interface IAbsorber {
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

    /**
     * Absorber draggable, this enables dragging on absorbers
     */
    draggable: boolean;

    /**
     * Absorber destroy, this enable particle destruction, if disabled the particle will randomly respawn
     */
    destroy: boolean;

    /**
     * Absorber orbits, this enable particles orbiting while being attracted by the attracter
     */
    orbits: boolean;
}
