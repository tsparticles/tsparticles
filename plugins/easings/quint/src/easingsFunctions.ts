/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-quint", value => value ** 5);
easingsFunctions.set("ease-out-quint", value => 1 - (1 - value) ** 5);
easingsFunctions.set("ease-in-out-quint", value =>
  value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2,
);

export { easingsFunctions };
