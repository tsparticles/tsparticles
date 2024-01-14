import type { Bounce } from "./Options/Classes/Bounce.js";
import type { BounceOptions } from "./Options/Classes/BounceOptions.js";
import type { Container } from "@tsparticles/engine";
import type { IBounce } from "./Options/Interfaces/IBounce.js";

export interface IBounceMode {
    bounce: IBounce;
}

export interface BounceMode {
    bounce?: Bounce;
}

export type BounceContainer = Container & {
    actualOptions: BounceOptions;
    retina: {
        bounceModeDistance?: number;
    };
};
