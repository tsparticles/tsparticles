import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ILife } from "../Interfaces/ILife.js";
import { LifeDelay } from "./LifeDelay.js";
import { LifeDuration } from "./LifeDuration.js";

/** Life options class */
export class Life implements ILife, IOptionLoader<ILife> {
  /** Life count */
  count;
  /** Life delay */
  delay;
  /** Life duration */
  duration;

  /** Life constructor */
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }

  /**
   * Loads the life options from data
   * @param data
   */
  load(data?: RecursivePartial<ILife>): void {
    if (isNull(data)) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
}
