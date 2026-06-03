import { AnimationOptions, RangedAnimationOptions } from "./AnimationOptions.js";
import type { IAnimationValueWithRandom, IValueWithRandom } from "../Interfaces/IValueWithRandom.js";
import { OptionLoader } from "../../Utils/OptionsUtils.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { isNull } from "../../Utils/TypeUtils.js";
import { setRangeValue } from "../../Utils/MathUtils.js";

/** Value with random range option class */
export class ValueWithRandom extends OptionLoader<IValueWithRandom> implements IValueWithRandom {
  value: RangeValue;

  constructor() {
    super();
    this.value = 0;
  }

  doLoad(data: RecursivePartial<IValueWithRandom>): void {
    if (!isNull(data.value)) {
      this.value = setRangeValue(data.value);
    }
  }
}

/** Animation value with random range option class */
export class AnimationValueWithRandom extends ValueWithRandom {
  readonly animation = new AnimationOptions();

  override doLoad(data: RecursivePartial<IAnimationValueWithRandom>): void {
    super.doLoad(data);

    const animation = data.animation;

    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}

/** Ranged animation value with random range option class */
export class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
  override readonly animation: RangedAnimationOptions;

  constructor() {
    super();

    this.animation = new RangedAnimationOptions();
  }
}
