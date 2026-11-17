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
   * Custom transition duration in seconds, overriding the particle life duration; the transition
   * still requires the life updater with a finite life duration, since the life clock drives the progress
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
   * Transitions driven by the particle life progress, requires the life updater with a finite life
   * duration, since the life clock drives the progress (a custom transition duration only rescales it)
   */
  lifetime: ILifetimeColorTransitions;
}
