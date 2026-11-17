import type { IRangeColor } from "@tsparticles/engine";

/** A single color transition stop */
export interface IColorTransitionStop {
  /** The stop position in the transition, between 0 and 1 */
  offset: number;
  /** The stop color */
  value: IRangeColor | string;
}

/** Lifetime-based color transitions options */
export interface ILifetimeColorTransitions {
  /** Whether lifetime transitions are enabled */
  enable: boolean;
  /** The transition color stops */
  stops: IColorTransitionStop[];
  /** When false, every particle starts the transition at a random progress */
  sync: boolean;
}

/** Color transitions options */
export interface IColorTransitions {
  /** Transitions driven by the particle life progress, requires the life updater with a finite duration */
  lifetime: ILifetimeColorTransitions;
}
