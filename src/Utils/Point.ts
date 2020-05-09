import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Particle } from "../Core/Particle";

export class Point {
    public readonly position: ICoordinates;
    public readonly particle: Particle;

    constructor(x: number, y: number, particle: Particle) {
        this.position = {
            x: x,
            y: y,
        };

        this.particle = particle;
    }
}
