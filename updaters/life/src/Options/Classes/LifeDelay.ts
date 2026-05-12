import { type IOptionLoader, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";
import type { ILifeDelay } from "../Interfaces/ILifeDelay.js";

/** Life delay options class */
export class LifeDelay extends ValueWithRandom implements ILifeDelay, IOptionLoader<ILifeDelay> {
  /** Enables the life delay sync */
  sync;

  /** LifeDelay constructor */
  constructor() {
    super();
    this.sync = false;
  }

  /**
   * Loads the life delay from data
   * @param data
   */
  override load(data?: RecursivePartial<ILifeDelay>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
