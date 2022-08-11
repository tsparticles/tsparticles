import type { Container, Particle } from "tsparticles-engine";
import type { Attract } from "./Options/Classes/Attract";
import type { AttractOptions } from "./Options/Classes/AttractOptions";
import type { IAttract } from "./Options/Interfaces/IAttract";

export type IAttractMode = {
    attract: IAttract;
};

export type AttractMode = {
    attract?: Attract;
};

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
