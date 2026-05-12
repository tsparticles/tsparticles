import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ITwinkle } from "../Interfaces/ITwinkle.js";
import { TwinkleLinksValues } from "./TwinkleLinksValues.js";
import { TwinkleParticlesValues } from "./TwinkleParticlesValues.js";

/**
 * [[include:Options/Particles/Twinkle.md]]
 */
export class Twinkle implements ITwinkle, IOptionLoader<ITwinkle> {
  /** Twinkle links values */
  links;
  /** Twinkle particles values */
  particles;

  /** Twinkle constructor */
  constructor() {
    this.links = new TwinkleLinksValues();
    this.particles = new TwinkleParticlesValues();
  }

  /**
   * Loads the twinkle options from data
   * @param data
   */
  load(data?: RecursivePartial<ITwinkle>): void {
    if (isNull(data)) {
      return;
    }

    this.links.load(data.links);
    this.particles.load(data.particles);
  }
}
