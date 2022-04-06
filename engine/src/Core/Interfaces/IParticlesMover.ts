import type { IDelta } from "./IDelta";
import type { Particle } from "../Particle";

export interface IParticleMover {
    init(particle: Particle): void;

    isEnabled(particle: Particle): boolean;

    move(particle: Particle, delta: IDelta): void;
}
