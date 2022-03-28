import type { ICoordinates } from "../Interfaces";
import type { Particle } from "../Particle";

/**
 * @category Utils
 */
export class Point {
    /**
     * The point constructor, initializing its position
     * @param position the point position
     * @param particle the particle assigned to this point
     */
    constructor(readonly position: ICoordinates, readonly particle: Particle) {}
}
