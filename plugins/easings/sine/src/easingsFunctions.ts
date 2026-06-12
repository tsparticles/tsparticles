/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-sine", value => 1 - Math.cos((value * Math.PI) / 2));
easingsFunctions.set("ease-out-sine", value => Math.sin((value * Math.PI) / 2));
easingsFunctions.set("ease-in-out-sine", value => -(Math.cos(Math.PI * value) - 1) / 2);

export { easingsFunctions };
