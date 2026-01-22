import type { ISlow } from "./Options/Interfaces/ISlow.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { Slow } from "./Options/Classes/Slow.js";
import type { SlowOptions } from "./Options/Classes/SlowOptions.js";

export interface ISlowMode {
  slow: ISlow;
}

export interface SlowMode {
  slow?: Slow;
}

export type SlowContainer = InteractivityContainer & {
  actualOptions: SlowOptions;
  retina: {
    slowModeRadius?: number;
  };
};
