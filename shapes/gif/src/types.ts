import type { GIF } from "./GifUtils/Types/GIF.js";
import type { Particle } from "@tsparticles/engine";

export type GifParticle = Particle & {
  gifCanvas?: OffscreenCanvas;
  gifCanvasContext?: OffscreenCanvasRenderingContext2D;
  gifCanvasFrame?: number;
  gifData?: GIF;
  gifFrame?: number;
  gifLoopCount?: number;
  gifPreviousCanvas?: ImageData;
  gifTime?: number;
};
