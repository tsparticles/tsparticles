import type { Bounce } from "./Options/Classes/Bounce.js";
import type { BounceOptions } from "./Options/Classes/BounceOptions.js";
import type { IBounce } from "./Options/Interfaces/IBounce.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

export interface IBounceMode {
    bounce: IBounce;
}

export interface BounceMode {
    bounce?: Bounce;
}

export type BounceContainer = InteractivityContainer & {
    actualOptions: BounceOptions;
    retina: {
        bounceModeDistance?: number;
    };
};
