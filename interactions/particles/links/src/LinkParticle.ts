import type { Particle } from "tsparticles-engine";
import type { ILink } from "./ILink";

export type LinkParticle = Particle & {
    links: ILink[];
};
