import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { ColorTransitionStop } from "./ColorTransitionStop.js";
import type { ILifetimeColorTransitions } from "../Interfaces/IColorTransitions.js";

/** Lifetime color transitions options class */
export class LifetimeColorTransitions implements ILifetimeColorTransitions, IOptionLoader<ILifetimeColorTransitions> {
  /** Whether lifetime transitions are enabled */
  enable = false;
  /** The transition color stops */
  stops: ColorTransitionStop[] = [];
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

    if (data.stops !== undefined) {
      this.stops = data.stops.map(s => {
        const tmp = new ColorTransitionStop();

        tmp.load(s);

        return tmp;
      });
    }
  }
}
