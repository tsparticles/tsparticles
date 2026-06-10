import { type RecursivePartial, loadProperty } from "@tsparticles/engine";
import type { ICannon } from "../Interfaces/ICannon.js";

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
    this.maxDragDistance = 0;
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

    loadProperty(this, "spread", data.spread);
    loadProperty(this, "velocityFactor", data.velocityFactor);
    loadProperty(this, "particleFactor", data.particleFactor);
    loadProperty(this, "minParticles", data.minParticles);
    loadProperty(this, "maxParticles", data.maxParticles);
    loadProperty(this, "maxDragDistance", data.maxDragDistance);
    loadProperty(this, "drawVector", data.drawVector);
    loadProperty(this, "vectorColor", data.vectorColor);
  }
}
