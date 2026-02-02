/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>(),
  bounceOut = (t: number): number => {
    const n1 = 7.5625,
      d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      t -= 1.5 / d1;
      return n1 * t * t + 0.75;
    } else if (t < 2.5 / d1) {
      t -= 2.25 / d1;
      return n1 * t * t + 0.9375;
    } else {
      t -= 2.625 / d1;
      return n1 * t * t + 0.984375;
    }
  };

easingsFunctions.set(EasingType.easeOutBounce, value => bounceOut(value));
easingsFunctions.set(EasingType.easeInBounce, value => 1 - bounceOut(1 - value));
easingsFunctions.set(EasingType.easeInOutBounce, value =>
  value < 0.5 ? (1 - bounceOut(1 - value * 2)) / 2 : (1 + bounceOut(value * 2 - 1)) / 2,
);

export { easingsFunctions };
