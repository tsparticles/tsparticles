/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-cubic", value => value ** 3);
easingsFunctions.set("ease-out-cubic", value => 1 - (1 - value) ** 3);
easingsFunctions.set("ease-in-out-cubic", value =>
  value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2,
);

export { easingsFunctions };
