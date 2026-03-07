import { type HslAnimation, type Particle } from "@tsparticles/engine";

export type FillParticle = Particle & {
  fillAnimation?: HslAnimation;
};
