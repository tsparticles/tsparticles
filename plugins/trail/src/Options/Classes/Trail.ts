import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { type ITrail } from "../Interfaces/ITrail.js";
import { TrailFill } from "./TrailFill.js";

/**
 */
export class Trail implements ITrail, IOptionLoader<ITrail> {
  enable;
  readonly fill;
  length;

  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new TrailFill();
  }

  load(data?: RecursivePartial<ITrail>): void {
    if (isNull(data)) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.fill !== undefined) {
      this.fill.load(data.fill);
    }

    if (data.length !== undefined) {
      this.length = data.length;
    }
  }
}
