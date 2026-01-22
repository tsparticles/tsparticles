/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInExpo, value => (value ? 2 ** (10 * value - 10) : 0));
easingsFunctions.set(EasingType.easeOutExpo, value => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)));
easingsFunctions.set(EasingType.easeInOutExpo, value => {
  if (value === 1) {
    return 1;
  } else if (value) {
    return value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2;
  } else {
    return 0;
  }
});

export { easingsFunctions };
