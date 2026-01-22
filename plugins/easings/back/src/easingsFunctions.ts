/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInBack, value => {
  const c1 = 1.70158,
    c3 = c1 + 1;

  return c3 * value ** 3 - c1 * value ** 2;
});

easingsFunctions.set(EasingType.easeOutBack, value => {
  const c1 = 1.70158,
    c3 = c1 + 1;

  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
});

easingsFunctions.set(EasingType.easeInOutBack, value => {
  const c1 = 1.70158,
    c2 = c1 * 1.525;

  return value < 0.5
    ? ((2 * value) ** 2 * ((c2 + 1) * 2 * value - c2)) / 2
    : ((2 * value - 2) ** 2 * ((c2 + 1) * (value * 2 - 2) + c2) + 2) / 2;
});

export { easingsFunctions };
