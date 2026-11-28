import type {
  IColorTransitionChannel,
  IColorTransitionStop,
  ILifetimeColorTransitions,
} from "../Interfaces/IColorTransitions.js";
import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { ColorTransitionStop } from "./ColorTransitionStop.js";

/**
 * Loads a list of color transition stops from data
 * @param stops - The stops data to load
 * @returns The loaded stops
 */
function loadStops(stops: RecursivePartial<IColorTransitionStop[]> | undefined): ColorTransitionStop[] {
  if (!Array.isArray(stops)) {
    return [];
  }

  return stops.map(s => {
    const tmp = new ColorTransitionStop();

    tmp.load(s);

    return tmp;
  });
}

/** Color transitions options class for a single paint channel (fill or stroke) */
export class ColorTransitionChannel implements IColorTransitionChannel, IOptionLoader<IColorTransitionChannel> {
  /** The transition color stops for this channel */
  stops: ColorTransitionStop[] = [];

  /**
   * Loads the channel color transitions from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IColorTransitionChannel>): void {
    if (isNull(data) || data.stops === undefined) {
      return;
    }

    this.stops = loadStops(data.stops);
  }
}

/** Lifetime color transitions options class */
export class LifetimeColorTransitions implements ILifetimeColorTransitions, IOptionLoader<ILifetimeColorTransitions> {
  /** Custom transition duration, overriding the particle life duration */
  duration?: number;
  /** Whether lifetime transitions are enabled */
  enable = false;
  /** Fill color transitions, using the shared stops when its stops are empty */
  fill?: ColorTransitionChannel;
  /** The transition color stops, applied to both fill and stroke unless overridden per channel */
  stops: ColorTransitionStop[] = [];
  /** Stroke color transitions, using the shared stops when its stops are empty */
  stroke?: ColorTransitionChannel;
  /** When false, every particle starts the transition at a random progress */
  sync = true;

  /**
   * Loads the lifetime color transitions from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<ILifetimeColorTransitions>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "sync", data.sync);
    loadProperty(this, "duration", data.duration);

    if (data.stops !== undefined) {
      this.stops = loadStops(data.stops);
    }

    if (data.fill) {
      this.fill ??= new ColorTransitionChannel();

      this.fill.load(data.fill);
    }

    if (data.stroke) {
      this.stroke ??= new ColorTransitionChannel();

      this.stroke.load(data.stroke);
    }
  }
}
