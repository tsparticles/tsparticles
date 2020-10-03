import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { Particle } from "../Core/Particle";

/**
 * @category Utils
 */
export class Point {
    constructor(public readonly position: ICoordinates, public readonly particle: Particle) {}
}
