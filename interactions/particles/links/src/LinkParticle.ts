import type { Particle } from "tsparticles-core";
import type { ILink } from "./ILink";

export type LinkParticle = Particle & {
    links: ILink[];
};
