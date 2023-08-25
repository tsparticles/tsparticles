import type { Container } from "@tsparticles/engine";
import type { ISlow } from "./Options/Interfaces/ISlow.js";
import type { Slow } from "./Options/Classes/Slow.js";
import type { SlowOptions } from "./Options/Classes/SlowOptions.js";

export type ISlowMode = {
    slow: ISlow;
};

export type SlowMode = {
    slow?: Slow;
};

export type SlowContainer = Container & {
    actualOptions: SlowOptions;
    retina: {
        slowModeRadius?: number;
    };
};
