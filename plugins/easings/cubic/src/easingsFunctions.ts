/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInCubic, value => value ** 3);
easingsFunctions.set(EasingType.easeOutCubic, value => 1 - (1 - value) ** 3);
easingsFunctions.set(EasingType.easeInOutCubic, value =>
    value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2,
);

export { easingsFunctions };
