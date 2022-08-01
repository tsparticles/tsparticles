import type { ILink } from "./ILink";
import type { Particle } from "tsparticles-engine";
import type { ParticlesLinkOptions } from "./Options/Classes/ParticlesLinkOptions";

export type LinkParticle = Particle & {
    links?: ILink[];
    options: ParticlesLinkOptions;
    retina: {
        linksDistance?: number;
        linksWidth?: number;
    };
};
