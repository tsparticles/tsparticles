import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";

export interface IParticleMover {
    init(particle: Particle): Promise<void>;

    isEnabled(particle: Particle): boolean;

    move(particle: Particle, delta: IDelta): void;
}
