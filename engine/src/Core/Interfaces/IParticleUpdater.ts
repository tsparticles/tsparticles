import type { IDelta } from "./IDelta.js";
import type { IParticleColorStyle } from "./IParticleColorStyle.js";
import type { IParticleTransformValues } from "./IParticleTransformValues.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { Particle } from "../Particle.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

export interface IParticleUpdater {
  afterDraw?: (particle: Particle) => void;

  beforeDraw?: (particle: Particle) => void;

  getColorStyles?: (
    particle: Particle,
    context: CanvasRenderingContext2D,
    radius: number,
    opacity: number,
  ) => IParticleColorStyle;

  getTransformValues?: (particle: Particle) => Partial<IParticleTransformValues>;

  loadOptions?: (options: ParticlesOptions, ...sources: (RecursivePartial<IParticlesOptions> | undefined)[]) => void;

  particleDestroyed?: (particle: Particle, override?: boolean) => void;

  reset?: (particle: Particle) => void;

  init(particle: Particle): void;

  isEnabled(particle: Particle): boolean;

  update(particle: Particle, delta: IDelta): void;
}
