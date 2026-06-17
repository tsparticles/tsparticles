import type { IAnimation, IRangedAnimation } from "../Interfaces/IAnimation.js";
import { loadProperty, loadRangeProperty } from "../../Utils/OptionsUtils.js";
import { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import { OptionLoader } from "../../Utils/OptionLoader.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { StartValueType } from "../../Enums/Types/StartValueType.js";

/** Animation options configuration class */
export class AnimationOptions extends OptionLoader<IAnimation> implements IAnimation {
  /** Number of animation loops (0 = infinite) */
  count: RangeValue = 0;
  /** Animation decay factor */
  decay: RangeValue = 0;
  /** Delay before animation starts */
  delay: RangeValue = 0;
  /** Enables the animation */
  enable = false;
  /** Animation speed */
  speed: RangeValue = 1;
  /** Whether the animation is synchronized across particles */
  sync = false;

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
  mode: AnimationMode | keyof typeof AnimationMode = AnimationMode.auto;

  /** Start value type for the animation */
  startValue: StartValueType | keyof typeof StartValueType = StartValueType.random;

  protected override doLoad(data: RecursivePartial<IRangedAnimation>): void {
    super.doLoad(data);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "startValue", data.startValue);
  }
}
