import { type IOptionLoader, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";
import type { ILifeDuration } from "../Interfaces/ILifeDuration.js";

/** Life duration options class */
export class LifeDuration extends ValueWithRandom implements ILifeDuration, IOptionLoader<ILifeDuration> {
  /** Enables the life duration sync */
  sync;

  /** LifeDuration constructor */
  constructor() {
    super();
    this.sync = false;
  }

  /**
   * Loads the life duration from data
   * @param data
   */
  override load(data?: RecursivePartial<ILifeDuration>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
