import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";

export interface IParticleMover {
  destroy(): void;

  init(): Promise<void>;

  initParticle(particle: Particle): void;

  isEnabled(particle: Particle): boolean;

  move(particle: Particle, delta: IDelta): void;

  particleDestroyed(particle: Particle): void;

  update(): void;
}
