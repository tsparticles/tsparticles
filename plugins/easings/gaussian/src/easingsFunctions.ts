/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>(),
    gaussian = (t: number): number => Math.exp(-4 * (1 - t) * (1 - t));

easingsFunctions.set(EasingType.easeInGaussian, value => gaussian(value));
easingsFunctions.set(EasingType.easeOutGaussian, value => gaussian(value));
easingsFunctions.set(EasingType.easeInOutGaussian, value => gaussian(value));

export { easingsFunctions };
