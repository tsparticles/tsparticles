/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInCirc, value => 1 - Math.sqrt(1 - value ** 2));
easingsFunctions.set(EasingType.easeOutCirc, value => Math.sqrt(1 - (value - 1) ** 2));
easingsFunctions.set(EasingType.easeInOutCirc, value =>
    value < 0.5 ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2 : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2,
);

export { easingsFunctions };
