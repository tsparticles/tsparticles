import { type IOptionLoader, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";
import type { ILifeDelay } from "../Interfaces/ILifeDelay.js";

export class LifeDelay extends ValueWithRandom implements ILifeDelay, IOptionLoader<ILifeDelay> {
  sync;

  constructor() {
    super();
    this.sync = false;
  }

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
