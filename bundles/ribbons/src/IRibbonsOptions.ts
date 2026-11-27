import type { IDimension, IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

/** Ribbons options interface */
export interface IRibbonsOptions {
  /** Ribbon colors */
  colors: SingleOrMultiple<string>;

  /** Number of ribbon particles */
  count: number;

  /** Disables ribbons for users who prefer reduced motion */
  disableForReducedMotion: boolean;

  /** Emitter size for particle spawn area (in percent). Default: \{ width: 100, height: 0 \} */
  emitterSize: IDimension;

  /** Ribbons horizontal spawn position (percent). Default: 50 */
  positionX: number;

  /** Ribbon shape options */
  ribbonOptions: SingleOrMultiple<IShapeValues>;

  /** Ribbons size scalar */
  scalar: number;

  /** Ribbons z-index */
  zIndex: number;
}
