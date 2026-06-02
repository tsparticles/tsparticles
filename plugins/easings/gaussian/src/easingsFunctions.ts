/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>(),
  gaussian = (t: number): number => Math.exp(-4 * (1 - t) * (1 - t));

easingsFunctions.set("ease-in-gaussian", value => gaussian(value));
easingsFunctions.set("ease-out-gaussian", value => gaussian(value));
easingsFunctions.set("ease-in-out-gaussian", value => gaussian(value));

export { easingsFunctions };
