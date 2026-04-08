import { type HslAnimation, type Particle } from "@tsparticles/engine";

export type PaintParticle = Particle & {
  fillAnimation?: HslAnimation;
  strokeAnimation?: HslAnimation;
};
