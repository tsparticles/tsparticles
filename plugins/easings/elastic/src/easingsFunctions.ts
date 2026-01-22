/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInElastic, value => {
    if (value === 0 || value === 1) {
        return value;
    }
    return -Math.pow(2, 10 * (value - 1)) * Math.sin(((value - 1.075) * (2 * Math.PI)) / 0.3);
});

easingsFunctions.set(EasingType.easeOutElastic, value => {
    if (value === 0 || value === 1) {
        return value;
    }
    return Math.pow(2, -10 * value) * Math.sin(((value - 0.075) * (2 * Math.PI)) / 0.3) + 1;
});

easingsFunctions.set(EasingType.easeInOutElastic, value => {
    if (value === 0 || value === 1) {
        return value;
    }
    value *= 2;
    if (value < 1) {
        return -0.5 * Math.pow(2, 10 * (value - 1)) * Math.sin(((value - 1.1125) * (2 * Math.PI)) / 0.45);
    }
    return Math.pow(2, -10 * (value - 1)) * Math.sin(((value - 1.1125) * (2 * Math.PI)) / 0.45) * 0.5 + 1;
});

export { easingsFunctions };
