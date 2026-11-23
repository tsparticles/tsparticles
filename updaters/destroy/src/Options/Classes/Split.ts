import {
  type IOptionLoader,
  type IParticlesOptions,
  type IRangeOklch,
  OptionsColor,
  type RecursivePartial,
  type SingleOrMultiple,
  deepExtend,
  executeOnSingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { ISplit } from "../Interfaces/ISplit.js";
import { SplitFactor } from "./SplitFactor.js";
import { SplitRate } from "./SplitRate.js";

/** Split options class */
export class Split implements ISplit, IOptionLoader<ISplit> {
  /** The split count */
  count = 1;
  /** The split factor */
  readonly factor: SplitFactor = new SplitFactor();
  /** The split fill color */
  fillColor?: OptionsColor;
  /** The split fill color offset */
  fillColorOffset?: Partial<IRangeOklch>;
  /** The split particles options */
  particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
  /** The split rate */
  readonly rate: SplitRate = new SplitRate();
  /** The split size offset */
  sizeOffset = true;
  /** The split stroke color */
  strokeColor?: OptionsColor;
  /** The split stroke color offset */
  strokeColorOffset?: Partial<IRangeOklch>;

  /** Split constructor */

  /**
   * Loads the split options from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<ISplit>): void {
    if (isNull(data)) {
      return;
    }

    if (data.fillColor !== undefined) {
      this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);
    }

    if (data.strokeColor !== undefined) {
      this.strokeColor = OptionsColor.create(this.strokeColor, data.strokeColor);
    }

    loadProperty(this, "count", data.count);

    this.factor.load(data.factor);
    this.rate.load(data.rate);

    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
    });

    loadProperty(this, "sizeOffset", data.sizeOffset);

    if (data.fillColorOffset) {
      this.fillColorOffset = this.fillColorOffset ?? {};

      if (data.fillColorOffset.h !== undefined) {
        this.fillColorOffset.h = data.fillColorOffset.h;
      }

      if (data.fillColorOffset.c !== undefined) {
        this.fillColorOffset.c = data.fillColorOffset.c;
      }

      if (data.fillColorOffset.l !== undefined) {
        this.fillColorOffset.l = data.fillColorOffset.l;
      }
    }

    if (data.strokeColorOffset) {
      this.strokeColorOffset = this.strokeColorOffset ?? {};

      if (data.strokeColorOffset.h !== undefined) {
        this.strokeColorOffset.h = data.strokeColorOffset.h;
      }

      if (data.strokeColorOffset.c !== undefined) {
        this.strokeColorOffset.c = data.strokeColorOffset.c;
      }

      if (data.strokeColorOffset.l !== undefined) {
        this.strokeColorOffset.l = data.strokeColorOffset.l;
      }
    }
  }
}
