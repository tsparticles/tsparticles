import { OptionLoader, loadProperty, loadRangeProperty } from "../../../../Utils/OptionsUtils.js";
import type { IMoveGravity } from "../../../Interfaces/Particles/Move/IMoveGravity.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/** Movement gravity options class */
export class MoveGravity extends OptionLoader<IMoveGravity> implements IMoveGravity {
  /** Gravity acceleration value */
  acceleration: RangeValue;
  /** Enables or disables gravity */
  enable;
  /** If true, gravity pulls particles upward instead of downward */
  inverse;
  /** Maximum speed limit for gravity-affected particles */
  maxSpeed: RangeValue;

  constructor() {
    super();
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }

  /**
   * Loads gravity options from the given data
   * @param data -
   */
  protected doLoad(data: RecursivePartial<IMoveGravity>): void {
    loadRangeProperty(this, "acceleration", data.acceleration);
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "inverse", data.inverse);
    loadRangeProperty(this, "maxSpeed", data.maxSpeed);
  }
}
