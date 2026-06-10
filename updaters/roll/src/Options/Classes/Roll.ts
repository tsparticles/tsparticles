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
  darken;
  /** Enables the roll */
  enable;
  /** Roll enlighten options */
  enlighten;
  /** Roll mode */
  mode: RollMode | keyof typeof RollMode;
  /** Roll speed */
  speed: RangeValue;

  /** Roll constructor */
  constructor() {
    this.darken = new RollLight();
    this.enable = false;
    this.enlighten = new RollLight();
    this.mode = RollMode.vertical;
    this.speed = 25;
  }

  /**
   * Loads the roll options from data
   * @param data
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
