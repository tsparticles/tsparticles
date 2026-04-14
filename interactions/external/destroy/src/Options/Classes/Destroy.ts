import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IDestroy } from "../Interfaces/IDestroy.js";

export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
  distance: number;

  constructor() {
    this.distance = 200;
  }

  load(data?: RecursivePartial<IDestroy>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
}
