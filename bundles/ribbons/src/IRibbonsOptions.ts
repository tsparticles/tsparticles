import type { ICoordinates, IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

/** Ribbons options interface */
export interface IRibbonsOptions {
  /** Ribbons emission angle */
  angle: number;

  /** Ribbon colors */
  colors: SingleOrMultiple<string>;

  /** Number of ribbon particles */
  count: number;

  /** Ribbons decay rate */
  decay: number;

  /** Disables ribbons for users who prefer reduced motion */
  disableForReducedMotion: boolean;

  /** Ribbons drift */
  drift: number;

  /** Ribbons gravity */
  gravity: number;

  /**
   * @deprecated use position instead
   */
  origin: ICoordinates;

  /**
   * @deprecated use count instead
   */
  particleCount: number;

  /** Ribbons position in percent */
  position: ICoordinates;

  /** Ribbon shape options */
  ribbonOptions: SingleOrMultiple<IShapeValues>;

  /** Ribbons size scalar */
  scalar: number;

  /** Ribbons spread */
  spread: number;

  /** Ribbons initial velocity */
  startVelocity: number;

  /** Number of animation ticks */
  ticks: number;

  /** Ribbons z-index */
  zIndex: number;
}
