import type { IRibbonsOptions } from "./IRibbonsOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** The ribbons parameter object definition */
export interface RibbonsParams {
  /** The canvas element to use for the ribbons animation */
  canvas?: HTMLCanvasElement;

  /** The unique identifier for the ribbons canvas */
  id: string;

  /** The ribbons options object */
  options: RecursivePartial<IRibbonsOptions>;
}
