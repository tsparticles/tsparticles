import { type EasingFunction } from "@tsparticles/engine";

const easingsFunctions = new Map<string, EasingFunction>();

easingsFunctions.set("ease-in-linear", value => value);
easingsFunctions.set("ease-out-linear", value => value);
easingsFunctions.set("ease-in-out-linear", value => value);

export { easingsFunctions };
