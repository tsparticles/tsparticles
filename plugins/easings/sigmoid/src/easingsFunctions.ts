/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>(),
  sigmoid = (t: number): number => 1 / (1 + Math.exp(-10 * (t - 0.5)));

easingsFunctions.set(EasingType.easeInSigmoid, value => sigmoid(value));
easingsFunctions.set(EasingType.easeOutSigmoid, value => sigmoid(value));
easingsFunctions.set(EasingType.easeInOutSigmoid, value => sigmoid(value));

export { easingsFunctions };
