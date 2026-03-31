import type { ICannon } from "../Interfaces/ICannon.js";
import type { RecursivePartial } from "@tsparticles/engine";

export class Cannon implements ICannon {
  drawVector;
  maxDragDistance;
  maxParticles;
  minParticles;
  particleFactor;
  spread;
  vectorColor;
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
