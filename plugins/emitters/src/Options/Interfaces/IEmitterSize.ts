import type { IDimension, PixelMode } from "@tsparticles/engine";

/** The emitter size options */
export interface IEmitterSize extends IDimension {
  /** The emitter size mode */
  mode: PixelMode | keyof typeof PixelMode;
}
