/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction, EasingType, type EasingTypeAlt } from "@tsparticles/engine";

const easingsFunctions = new Map<EasingType | EasingTypeAlt, EasingFunction>(),
  smoothstep = (t: number): number => t * t * (3 - 2 * t);

easingsFunctions.set(EasingType.easeInSmoothstep, value => smoothstep(value));
easingsFunctions.set(EasingType.easeOutSmoothstep, value => smoothstep(value));
easingsFunctions.set(EasingType.easeInOutSmoothstep, value => smoothstep(value));

export { easingsFunctions };
