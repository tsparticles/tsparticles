/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>(),
  sigmoid = (t: number): number => 1 / (1 + Math.exp(-10 * (t - 0.5)));

easingsFunctions.set("ease-in-sigmoid", value => sigmoid(value));
easingsFunctions.set("ease-out-sigmoid", value => sigmoid(value));
easingsFunctions.set("ease-in-out-sigmoid", value => sigmoid(value));

export { easingsFunctions };
