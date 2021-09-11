import type { IDelta } from "./IDelta";
import type { Particle } from "../Particle";

export interface IParticleUpdater {
    init(particle: Particle): void;

    isEnabled(particle: Particle): boolean;

    update(particle: Particle, delta: IDelta): void;
}
