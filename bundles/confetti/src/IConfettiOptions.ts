import type { ICoordinates, SingleOrMultiple } from "@tsparticles/engine";

/** Confetti options interface */
export interface IConfettiOptions {
  /** Confetti emission angle */
  angle: number;

  /** Confetti colors */
  colors: SingleOrMultiple<string>;

  /** Number of confetti particles */
  count: number;

  /** Confetti decay rate */
  decay: number;

  /** Disables confetti for users who prefer reduced motion */
  disableForReducedMotion: boolean;

  /** Confetti drift */
  drift: number;

  /** Enables flat confetti */
  flat: boolean;

  /** Confetti gravity */
  gravity: number;

  /**
   * @deprecated use position instead
   */
  origin: ICoordinates;

  /**
   * @deprecated use count instead
   */
  particleCount: number;

  /** Confetti position in percent */
  position: ICoordinates;

  /** Confetti size scalar */
  scalar: number;

  /** Per-shape options */
  shapeOptions: Record<string, SingleOrMultiple<unknown>>;

  /** Confetti shape types */
  shapes: SingleOrMultiple<string>;

  /** Confetti spread */
  spread: number;

  /** Confetti initial velocity */
  startVelocity: number;

  /** Number of animation ticks */
  ticks: number;

  /** Confetti z-index */
  zIndex: number;
}
