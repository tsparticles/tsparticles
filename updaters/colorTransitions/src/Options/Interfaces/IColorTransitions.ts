import type { IRangeColor } from "@tsparticles/engine";

/** A single color transition stop */
export interface IColorTransitionStop {
  /** The stop position in the transition, between 0 and 1 */
  offset: number;
  /** The stop color */
  value: IRangeColor | string;
}

/** Color transitions options for a single paint channel (fill or stroke) */
export interface IColorTransitionChannel {
  /** The transition color stops for this channel, overriding the shared stops when not empty */
  stops: IColorTransitionStop[];
}

/** Lifetime-based color transitions options */
export interface ILifetimeColorTransitions {
  /**
   * Custom transition duration in seconds, overriding a finite particle life duration. Without
   * a finite life clock, the updater uses elapsed frame time with a default duration of one second.
   */
  duration?: number;
  /** Whether lifetime transitions are enabled */
  enable: boolean;
  /** Fill color transitions, using the shared stops when its stops are empty */
  fill?: IColorTransitionChannel;
  /** The transition color stops, applied to both fill and stroke unless overridden per channel */
  stops: IColorTransitionStop[];
  /** Stroke color transitions, using the shared stops when its stops are empty */
  stroke?: IColorTransitionChannel;
  /** When false, every particle starts the transition at a random progress */
  sync: boolean;
}

/** Color transitions options */
export interface IColorTransitions {
  /**
   * Transitions use finite particle life progress when available, otherwise their own elapsed clock.
   */
  lifetime: ILifetimeColorTransitions;
}
