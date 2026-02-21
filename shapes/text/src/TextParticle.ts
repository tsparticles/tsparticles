import type { Particle } from "@tsparticles/engine";

export interface TextParticle extends Particle {
  maxTextLength?: number;
  textLines?: string[];
}
