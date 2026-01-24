import type { IDimension, PixelMode } from "@tsparticles/engine";

/**
 */
export interface IEmitterSize extends IDimension {
  mode: PixelMode | keyof typeof PixelMode;
}
