import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ICollisionsAbsorb } from "../Interfaces/ICollisionsAbsorb.js";

export class CollisionsAbsorb implements ICollisionsAbsorb, IOptionLoader<ICollisionsAbsorb> {
  /** The absorb speed */
  speed = 2;

  load(data?: RecursivePartial<ICollisionsAbsorb>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "speed", data.speed);
  }
}
