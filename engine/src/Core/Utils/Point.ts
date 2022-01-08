import type { ICoordinates } from "../Interfaces";
import type { Particle } from "../Particle";

/**
 * @category Utils
 */
export class Point {
    constructor(readonly position: ICoordinates, readonly particle: Particle) {}
}
