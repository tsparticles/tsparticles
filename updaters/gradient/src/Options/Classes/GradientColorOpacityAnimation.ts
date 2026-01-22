import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  StartValueType,
  isNull,
  setRangeValue,
} from "@tsparticles/engine";
import type { IGradientColorOpacityAnimation } from "../Interfaces/IOptionsGradient.js";

export class GradientColorOpacityAnimation
  implements IGradientColorOpacityAnimation, IOptionLoader<IGradientColorOpacityAnimation>
{
  count: RangeValue;
  decay: RangeValue;
  delay: RangeValue;
  enable;
  speed: RangeValue;
  startValue: StartValueType | keyof typeof StartValueType;
  sync;

  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
    this.startValue = StartValueType.random;
  }

  load(data?: RecursivePartial<IGradientColorOpacityAnimation>): void {
    if (isNull(data)) {
      return;
    }

    if (data.count !== undefined) {
      this.count = setRangeValue(data.count);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }

    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }

    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
  }
}
