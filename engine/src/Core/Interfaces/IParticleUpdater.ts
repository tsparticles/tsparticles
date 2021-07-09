import type { IDelta } from "./IDelta";
import type { Particle } from "../Particle";

export interface IParticleUpdater {
    isEnabled(particle: Particle): boolean;

    update(particle: Particle, delta: IDelta): void;
}
