/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInQuart, value => value ** 4);
easingsFunctions.set(EasingType.easeOutQuart, value => 1 - (1 - value) ** 4);
easingsFunctions.set(EasingType.easeInOutQuart, value =>
    value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2,
);

export { easingsFunctions };
