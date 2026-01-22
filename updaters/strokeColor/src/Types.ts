import { type HslAnimation, type Particle } from "@tsparticles/engine";

export type StrokeParticle = Particle & {
  strokeAnimation?: HslAnimation;
};
