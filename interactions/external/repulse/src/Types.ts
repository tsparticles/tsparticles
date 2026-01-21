import type { IRepulse } from "./Options/Interfaces/IRepulse.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { Particle } from "@tsparticles/engine";
import type { Repulse } from "./Options/Classes/Repulse.js";
import type { RepulseOptions } from "./Options/Classes/RepulseOptions.js";

export interface IRepulseMode {
    repulse: IRepulse;
}

export interface RepulseMode {
    repulse?: Repulse;
}

interface IContainerRepulse {
    clicking?: boolean;
    count?: number;
    finish?: boolean;
    particles: Particle[];
}

export type RepulseContainer = InteractivityContainer & {
    actualOptions: RepulseOptions;
    repulse?: IContainerRepulse;
    retina: {
        repulseModeDistance?: number;
    };
};

/* export type RepulsParticle = Particle & {
    repulseCurrentTime?: number;
} */

/* import type { Container, Particle, Vector } from "@tsparticles/engine";
import type { IRepulse } from "./Options/Interfaces/IRepulse.js";
import type { Repulse } from "./Options/Classes/Repulse.js";
import type { RepulseOptions } from "./Options/Classes/RepulseOptions.js";

export type IRepulseMode = {
    repulse: IRepulse;
};

export type RepulseMode = {
    repulse?: Repulse;
};

export type RepulseContainer = Container & {
    actualOptions: RepulseOptions;
    retina: {
        repulseModeDistance?: number;
    };
};

export type RepulseParticle = Particle & {
    normalPosition?: Vector;
    repulse?: boolean;
};
*/
