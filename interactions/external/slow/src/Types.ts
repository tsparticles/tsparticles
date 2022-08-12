import type { Container } from "tsparticles-engine";
import type { ISlow } from "./Options/Interfaces/ISlow";
import type { Slow } from "./Options/Classes/Slow";
import type { SlowOptions } from "./Options/Classes/SlowOptions";

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
