import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation.js";
import { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import { OptionLoader } from "../../Utils/OptionsUtils.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { StartValueType } from "../../Enums/Types/StartValueType.js";
import { setRangeValue } from "../../Utils/MathUtils.js";

/** Animation options configuration class */
export class AnimationOptions extends OptionLoader<IAnimation> implements IAnimation {
  /** Number of animation loops (0 = infinite) */
  count: RangeValue;
  /** Animation decay factor */
  decay: RangeValue;
  /** Delay before animation starts */
  delay: RangeValue;
  /** Enables the animation */
  enable;
  /** Animation speed */
  speed: RangeValue;
  /** Whether the animation is synchronized across particles */
  sync;

  constructor() {
    super();

    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }

  doLoad(data: RecursivePartial<IAnimation>): void {
    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }

    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }

    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}

/** Ranged animation options with mode and start value */
export class RangedAnimationOptions extends AnimationOptions {
  /** Animation mode (auto, increase, decrease, random) */
  mode: AnimationMode | keyof typeof AnimationMode;

  /** Start value type for the animation */
  startValue: StartValueType | keyof typeof StartValueType;

  constructor() {
    super();

    this.mode = AnimationMode.auto;
    this.startValue = StartValueType.random;
  }

  override doLoad(data: RecursivePartial<IRangedAnimation>): void {
    super.doLoad(data);

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
  }
}
