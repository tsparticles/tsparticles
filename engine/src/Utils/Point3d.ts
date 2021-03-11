import type { ICoordinates3d } from "../Core/Interfaces/ICoordinates";
import type { Particle } from "../Core/Particle";

/**
 * @category Utils
 */
export class Point3d {
    constructor(public readonly position: ICoordinates3d, public readonly particle: Particle) {}
}
