import type { Particle } from "@tsparticles/engine";
import type { SpiralDirection } from "./SpiralDirection.js";

interface SpiralData {
  angle: number;
  angularSpeed: number;
  direction: SpiralDirection;
  maxRadius: number;
  radialSpeed: number;
  radius: number;
}

export interface SpiralParticle extends Particle {
  spiral?: SpiralData;
}
