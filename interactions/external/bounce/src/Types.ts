import type { Bounce } from "./Options/Classes/Bounce.js";
import type { BounceOptions } from "./Options/Classes/BounceOptions.js";
import type { Container } from "@tsparticles/engine";
import type { IBounce } from "./Options/Interfaces/IBounce.js";

export type IBounceMode = {
    bounce: IBounce;
};

export type BounceMode = {
    bounce?: Bounce;
};

export type BounceContainer = Container & {
    actualOptions: BounceOptions;
    retina: {
        bounceModeDistance?: number;
    };
};
