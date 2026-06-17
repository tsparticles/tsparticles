/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-quad", value => value ** 2);
easingsFunctions.set("ease-out-quad", value => 1 - (1 - value) ** 2);
easingsFunctions.set("ease-in-out-quad", value => (value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2));

export { easingsFunctions };
