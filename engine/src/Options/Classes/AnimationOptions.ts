import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation.js";
import { OptionLoader, loadProperty, loadRangeProperty } from "../../Utils/OptionsUtils.js";
import { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { StartValueType } from "../../Enums/Types/StartValueType.js";

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

  protected doLoad(data: RecursivePartial<IAnimation>): void {
    loadRangeProperty(this, "count", data.count);
    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "speed", data.speed);
    loadRangeProperty(this, "decay", data.decay);
    loadRangeProperty(this, "delay", data.delay);
    loadProperty(this, "sync", data.sync);
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

  protected override doLoad(data: RecursivePartial<IRangedAnimation>): void {
    super.doLoad(data);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "startValue", data.startValue);
  }
}
