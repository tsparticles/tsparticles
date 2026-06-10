import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILife } from "../Interfaces/ILife.js";
import { LifeDelay } from "./LifeDelay.js";
import { LifeDuration } from "./LifeDuration.js";

/**
 * Life options class
 * [[include:Options/Particles/Life.md]]
 */
export class Life implements ILife, IOptionLoader<ILife> {
  /** Life count */
  count = 0;
  /** Life delay */
  readonly delay = new LifeDelay();
  /** Life duration */
  readonly duration = new LifeDuration();
  /** Life constructor */

  /**
   * Loads the life options from data
   * @param data
   */
  load(data?: RecursivePartial<ILife>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "count", data.count);

    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
}
