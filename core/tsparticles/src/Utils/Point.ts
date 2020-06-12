import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Particle } from "../Core/Particle";

export class Point {
    constructor(public readonly position: ICoordinates, public readonly particle: Particle) {}
}
