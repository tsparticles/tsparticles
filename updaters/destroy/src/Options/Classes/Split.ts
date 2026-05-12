import {
  type IOptionLoader,
  type IParticlesOptions,
  type IRangeHsl,
  OptionsColor,
  type RecursivePartial,
  type SingleOrMultiple,
  deepExtend,
  executeOnSingleOrMultiple,
  isNull,
} from "@tsparticles/engine";
import type { ISplit } from "../Interfaces/ISplit.js";
import { SplitFactor } from "./SplitFactor.js";
import { SplitRate } from "./SplitRate.js";

/** Split options class */
export class Split implements ISplit, IOptionLoader<ISplit> {
  /** The split count */
  count: number;
  /** The split factor */
  factor: SplitFactor;
  /** The split fill color */
  fillColor?: OptionsColor;
  /** The split fill color offset */
  fillColorOffset?: Partial<IRangeHsl>;
  /** The split particles options */
  particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
  /** The split rate */
  rate: SplitRate;
  /** The split size offset */
  sizeOffset: boolean;
  /** The split stroke color */
  strokeColor?: OptionsColor;
  /** The split stroke color offset */
  strokeColorOffset?: Partial<IRangeHsl>;

  /** Split constructor */
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
    this.sizeOffset = true;
  }

  /**
   * Loads the split options from data
   * @param data
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

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.factor.load(data.factor);
    this.rate.load(data.rate);

    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles) as RecursivePartial<IParticlesOptions>;
    });

    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }

    if (data.fillColorOffset) {
      this.fillColorOffset = this.fillColorOffset ?? {};

      if (data.fillColorOffset.h !== undefined) {
        this.fillColorOffset.h = data.fillColorOffset.h;
      }

      if (data.fillColorOffset.s !== undefined) {
        this.fillColorOffset.s = data.fillColorOffset.s;
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

      if (data.strokeColorOffset.s !== undefined) {
        this.strokeColorOffset.s = data.strokeColorOffset.s;
      }

      if (data.strokeColorOffset.l !== undefined) {
        this.strokeColorOffset.l = data.strokeColorOffset.l;
      }
    }
  }
}
