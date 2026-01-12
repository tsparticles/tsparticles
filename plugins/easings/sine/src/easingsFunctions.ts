/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>();

easingsFunctions.set(EasingType.easeInSine, value => 1 - Math.cos((value * Math.PI) / 2));
easingsFunctions.set(EasingType.easeOutSine, value => Math.sin((value * Math.PI) / 2));
easingsFunctions.set(EasingType.easeInOutSine, value => -(Math.cos(Math.PI * value) - 1) / 2);

export { easingsFunctions };
