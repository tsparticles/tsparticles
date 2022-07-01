import type { IOptionsColor, IRangedCoordinates, RecursivePartial } from "tsparticles-engine";
import type { IAbsorberSize } from "./IAbsorberSize";

/**
 * Absorber options
 * [[include:Options/Plugins/Absorbers.md]]
 * @category Absorbers Plugin
 */
export interface IAbsorber {
    /**
     * Absorber color
     */
    color: string | IOptionsColor;

    /**
     * Absorber destroy, this enable particle destruction, if disabled the particle will randomly respawn
     */
    destroy: boolean;

    /**
     * Absorber draggable, this enables dragging on absorbers
     */
    draggable: boolean;

    /**
     * Absorber name
     */
    name?: string;

    /**
     * Absorber opacity
     */
    opacity: number;

    /**
     * Absorber orbits, this enable particles orbiting while being attracted by the attracter
     */
    orbits: boolean;

    /**
     * Absorber position, percent values calculated on canvas size
     */
    position?: RecursivePartial<IRangedCoordinates>;

    /**
     * Absorber size, these values will be used as pixels
     */
    size: IAbsorberSize;
}
