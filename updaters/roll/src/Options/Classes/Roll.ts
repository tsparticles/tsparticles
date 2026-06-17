import {
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IRoll } from "../Interfaces/IRoll.js";
import { RollLight } from "./RollLight.js";
import { RollMode } from "../../RollMode.js";

/**
 * Roll options class
 * [[include:Options/Particles/Roll.md]]
 */
export class Roll implements IRoll, IOptionLoader<IRoll> {
  /** Roll back color */
  backColor?: OptionsColor;
  /** Roll darken options */
  readonly darken = new RollLight();
  /** Enables the roll */
  enable = false;
  /** Roll enlighten options */
  readonly enlighten = new RollLight();
  /** Roll mode */
  mode: RollMode | keyof typeof RollMode = RollMode.vertical;
  /** Roll speed */
  speed: RangeValue = 25;
  /** Roll constructor */

  /**
   * Loads the roll options from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IRoll>): void {
    if (isNull(data)) {
      return;
    }

    if (data.backColor !== undefined) {
      this.backColor = OptionsColor.create(this.backColor, data.backColor);
    }

    this.darken.load(data.darken);

    loadProperty(this, "enable", data.enable);

    this.enlighten.load(data.enlighten);

    loadProperty(this, "mode", data.mode);

    loadRangeProperty(this, "speed", data.speed);
  }
}
