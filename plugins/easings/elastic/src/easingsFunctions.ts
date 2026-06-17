/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-elastic", value => {
  if (value === 0 || value === 1) {
    return value;
  }
  return -Math.pow(2, 10 * (value - 1)) * Math.sin(((value - 1.075) * (2 * Math.PI)) / 0.3);
});

easingsFunctions.set("ease-out-elastic", value => {
  if (value === 0 || value === 1) {
    return value;
  }
  return Math.pow(2, -10 * value) * Math.sin(((value - 0.075) * (2 * Math.PI)) / 0.3) + 1;
});

easingsFunctions.set("ease-in-out-elastic", value => {
  if (value === 0 || value === 1) {
    return value;
  }
  value *= 2;
  if (value < 1) {
    return -0.5 * Math.pow(2, 10 * (value - 1)) * Math.sin(((value - 1.1125) * (2 * Math.PI)) / 0.45);
  }
  return Math.pow(2, -10 * (value - 1)) * Math.sin(((value - 1.1125) * (2 * Math.PI)) / 0.45) * 0.5 + 1;
});

export { easingsFunctions };
