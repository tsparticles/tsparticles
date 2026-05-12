import type { IConfettiOptions } from "./IConfettiOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** The confetti parameter object definition */
export interface ConfettiParams {
  /** The canvas element to use for the confetti animation */
  canvas?: HTMLCanvasElement;

  /** The unique identifier for the confetti canvas */
  id: string;

  /** The confetti options object */
  options: RecursivePartial<IConfettiOptions>;
}
