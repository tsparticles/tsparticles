import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ICollisionsAbsorb } from "../Interfaces/ICollisionsAbsorb.js";

export class CollisionsAbsorb implements ICollisionsAbsorb, IOptionLoader<ICollisionsAbsorb> {
  speed;

  constructor() {
    this.speed = 2;
  }

  load(data?: RecursivePartial<ICollisionsAbsorb>): void {
    if (isNull(data)) {
      return;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }
}
