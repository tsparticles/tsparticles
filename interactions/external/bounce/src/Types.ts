import type { Bounce } from "./Options/Classes/Bounce";
import type { BounceOptions } from "./Options/Classes/BounceOptions";
import type { Container } from "tsparticles-engine";
import type { IBounce } from "./Options/Interfaces/IBounce";

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
