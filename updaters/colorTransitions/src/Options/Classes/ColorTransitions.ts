import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IColorTransitions } from "../Interfaces/IColorTransitions.js";
import { LifetimeColorTransitions } from "./LifetimeColorTransitions.js";

/** Color transitions options class */
export class ColorTransitions implements IColorTransitions, IOptionLoader<IColorTransitions> {
  /** Transitions driven by the particle life progress */
  readonly lifetime: LifetimeColorTransitions = new LifetimeColorTransitions();

  /**
   * Loads the color transitions from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IColorTransitions>): void {
    if (isNull(data)) {
      return;
    }

    this.lifetime.load(data.lifetime);
  }
}
