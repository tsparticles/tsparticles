import type { Container, Particle } from "tsparticles-engine";
import type { IRepulse } from "./Options/Interfaces/IRepulse";
import type { Repulse } from "./Options/Classes/Repulse";
import type { RepulseOptions } from "./Options/Classes/RepulseOptions";

export type IRepulseMode = {
    repulse: IRepulse;
};

export type RepulseMode = {
    repulse?: Repulse;
};

interface IContainerRepulse {
    clicking?: boolean;
    count?: number;
    finish?: boolean;
    particles: Particle[];
}

export type RepulseContainer = Container & {
    actualOptions: RepulseOptions;
    repulse?: IContainerRepulse;
    retina: {
        repulseModeDistance?: number;
    };
};

/*import type { Container, Particle, Vector } from "tsparticles-engine";
import type { IRepulse } from "./Options/Interfaces/IRepulse";
import type { Repulse } from "./Options/Classes/Repulse";
import type { RepulseOptions } from "./Options/Classes/RepulseOptions";

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
