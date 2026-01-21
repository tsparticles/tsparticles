/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInQuint, value => value ** 5);
easingsFunctions.set(EasingType.easeOutQuint, value => 1 - (1 - value) ** 5);
easingsFunctions.set(EasingType.easeInOutQuint, value =>
    value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2,
);

export { easingsFunctions };
