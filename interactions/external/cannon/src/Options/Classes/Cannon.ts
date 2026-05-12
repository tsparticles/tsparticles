import type { ICannon } from "../Interfaces/ICannon.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** Cannon mode options class */
export class Cannon implements ICannon {
  /** Whether to draw the aiming vector */
  drawVector;

  /** Maximum drag distance in pixels */
  maxDragDistance;

  /** Maximum number of particles to spawn */
  maxParticles;

  /** Minimum number of particles to spawn */
  minParticles;

  /** Particles per pixel of drag distance */
  particleFactor;

  /** Spread angle in degrees */
  spread;

  /** CSS color for the aiming vector line */
  vectorColor;

  /** Velocity multiplier from drag distance */
  velocityFactor;

  constructor() {
    this.spread = 30;
    this.velocityFactor = 0.5;
    this.particleFactor = 0.2;
    this.maxDragDistance = 200;
    this.minParticles = 5;
    this.maxParticles = 200;
    this.drawVector = true;
    this.vectorColor = "#ffffff80";
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ICannon>): void {
    if (!data) {
      return;
    }

    if (data.spread !== undefined) {
      this.spread = data.spread;
    }

    if (data.velocityFactor !== undefined) {
      this.velocityFactor = data.velocityFactor;
    }

    if (data.particleFactor !== undefined) {
      this.particleFactor = data.particleFactor;
    }

    if (data.minParticles !== undefined) {
      this.minParticles = data.minParticles;
    }

    if (data.maxParticles !== undefined) {
      this.maxParticles = data.maxParticles;
    }

    if (data.drawVector !== undefined) {
      this.drawVector = data.drawVector;
    }

    if (data.vectorColor !== undefined) {
      this.vectorColor = data.vectorColor;
    }
  }
}
