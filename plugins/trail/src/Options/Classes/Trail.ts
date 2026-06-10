import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { type ITrail } from "../Interfaces/ITrail.js";
import { TrailFill } from "./TrailFill.js";

/**
 * Trail options class
 * [[include:Options/Plugins/Trail.md]]
 */
export class Trail implements ITrail, IOptionLoader<ITrail> {
  /** Enables the trail */
  enable;
  /** The trail fill options */
  readonly fill;
  /** The trail length */
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

    loadProperty(this, "enable", data.enable);

    if (data.fill !== undefined) {
      this.fill.load(data.fill);
    }

    loadProperty(this, "length", data.length);
  }
}
