/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-circ", value => 1 - Math.sqrt(1 - value ** 2));
easingsFunctions.set("ease-out-circ", value => Math.sqrt(1 - (value - 1) ** 2));
easingsFunctions.set("ease-in-out-circ", value =>
  value < 0.5 ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2 : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2,
);

export { easingsFunctions };
