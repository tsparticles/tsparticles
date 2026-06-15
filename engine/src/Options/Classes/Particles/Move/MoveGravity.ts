import { OptionLoader, loadProperty, loadRangeProperty } from "../../../../Utils/OptionsUtils.js";
import type { IMoveGravity } from "../../../Interfaces/Particles/Move/IMoveGravity.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/** Movement gravity options class */
export class MoveGravity extends OptionLoader<IMoveGravity> implements IMoveGravity {
  /** Gravity acceleration value */
  acceleration: RangeValue = 9.81;
  /** Enables or disables gravity */
  enable = false;
  /** If true, gravity pulls particles upward instead of downward */
  inverse = false;
  /** Maximum speed limit for gravity-affected particles */
  maxSpeed: RangeValue = 50;

  /**
   * Loads gravity options from the given data
   * @param data - The data to handle
   */
  protected doLoad(data: RecursivePartial<IMoveGravity>): void {
    loadRangeProperty(this, "acceleration", data.acceleration);
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "inverse", data.inverse);
    loadRangeProperty(this, "maxSpeed", data.maxSpeed);
  }
}
