/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-quart", value => value ** 4);
easingsFunctions.set("ease-out-quart", value => 1 - (1 - value) ** 4);
easingsFunctions.set("ease-in-out-quart", value =>
  value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2,
);

export { easingsFunctions };
