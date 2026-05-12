import type { CanvasContextType } from "../../Types/CanvasContextType.js";
import type { IDelta } from "./IDelta.js";
import type { IParticleColorStyle } from "./IParticleColorStyle.js";
import type { IParticleTransformValues } from "./IParticleTransformValues.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { Particle } from "../Particle.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/** Particle updater interface for custom particle behavior */
export interface IParticleUpdater {
  /** Called after drawing a particle */
  afterDraw?: (particle: Particle) => void;

  /** Called before drawing a particle */
  beforeDraw?: (particle: Particle) => void;

  /** Returns custom color styles for a particle */
  getColorStyles?: (
    particle: Particle,
    context: CanvasContextType,
    radius: number,
    opacity: number,
  ) => IParticleColorStyle;

  /** Returns custom transform values for a particle */
  getTransformValues?: (particle: Particle) => Partial<IParticleTransformValues>;

  /** Loads particle updater options */
  loadOptions?: (options: ParticlesOptions, ...sources: (RecursivePartial<IParticlesOptions> | undefined)[]) => void;

  /** Called when a particle is destroyed */
  particleDestroyed?: (particle: Particle, override?: boolean) => void;

  /** Resets the updater state for a particle */
  reset?: (particle: Particle) => void;

  /** Initializes the updater for a particle */
  init(particle: Particle): void;

  /** Checks if the updater is enabled for the given particle */
  isEnabled(particle: Particle): boolean;

  /** Updates the particle each frame */
  update(particle: Particle, delta: IDelta): void;
}
