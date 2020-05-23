import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Particle } from "../Core/Particle";

export class Point {
    public readonly position: ICoordinates;
    public readonly particle: Particle;

    constructor(position: ICoordinates, particle: Particle) {
        this.position = {
            x: position.x,
            y: position.y,
        };

        this.particle = particle;
    }
}
