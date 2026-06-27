import type { GIF } from "./GifUtils/Types/GIF.js";
import type { Particle } from "@tsparticles/engine";

export type GifParticle = Particle & {
  gifData?: GIF;
  gifFrame?: number;
  gifLoopCount?: number;
  gifTime?: number;
};
