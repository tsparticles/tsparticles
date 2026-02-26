import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";

export interface IParticleMover {
  destroy(): void;

  isEnabled(particle: Particle): boolean;

  particleCreated(particle: Particle): void;

  particleDestroyed(particle: Particle): void;

  particleUpdate(particle: Particle, delta: IDelta): void;

  preInit(): Promise<void>;

  redrawInit(): Promise<void>;

  update(): void;
}
