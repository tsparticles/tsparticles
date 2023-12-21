import type { Container, Particle } from "@tsparticles/engine";
import type { Attract } from "./Options/Classes/Attract.js";
import type { AttractOptions } from "./Options/Classes/AttractOptions.js";
import type { IAttract } from "./Options/Interfaces/IAttract.js";

export interface IAttractMode {
    attract: IAttract;
}

export interface AttractMode {
    attract?: Attract;
}

interface IContainerAttract {
    clicking?: boolean;
    count?: number;
    finish?: boolean;
    particles: Particle[];
}

export type AttractContainer = Container & {
    actualOptions: AttractOptions;
    attract?: IContainerAttract;
    retina: {
        attractModeDistance?: number;
    };
};
