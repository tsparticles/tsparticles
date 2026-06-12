/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>(),
  smoothstep = (t: number): number => t * t * (3 - 2 * t);

easingsFunctions.set("ease-in-smoothstep", value => smoothstep(value));
easingsFunctions.set("ease-out-smoothstep", value => smoothstep(value));
easingsFunctions.set("ease-in-out-smoothstep", value => smoothstep(value));

export { easingsFunctions };
