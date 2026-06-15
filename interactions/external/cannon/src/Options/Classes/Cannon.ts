import { type RecursivePartial, loadProperty } from "@tsparticles/engine";
import type { ICannon } from "../Interfaces/ICannon.js";

/** Cannon mode options class */
export class Cannon implements ICannon {
  /** Whether to draw the aiming vector */
  drawVector = true;
  /** Maximum drag distance in pixels */
  maxDragDistance = 0;
  /** Maximum number of particles to spawn */
  maxParticles = 200;
  /** Minimum number of particles to spawn */
  minParticles = 5;
  /** Particles per pixel of drag distance */
  particleFactor = 0.2;
  /** Spread angle in degrees */
  spread = 30;
  /** CSS color for the aiming vector line */
  vectorColor = "#ffffff80";
  /** Velocity multiplier from drag distance */
  velocityFactor = 0.5;

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
