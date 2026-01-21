import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInLinear, value => value);
easingsFunctions.set(EasingType.easeOutLinear, value => value);
easingsFunctions.set(EasingType.easeInOutLinear, value => value);

export { easingsFunctions };
