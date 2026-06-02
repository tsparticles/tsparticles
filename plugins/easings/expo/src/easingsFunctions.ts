/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-expo", value => (value ? 2 ** (10 * value - 10) : 0));
easingsFunctions.set("ease-out-expo", value => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value)));
easingsFunctions.set("ease-in-out-expo", value => {
  if (value === 1) {
    return 1;
  } else if (value) {
    return value < 0.5 ? 2 ** (20 * value - 10) / 2 : (2 - 2 ** (-20 * value + 10)) / 2;
  } else {
    return 0;
  }
});

export { easingsFunctions };
