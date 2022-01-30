import type { ILink } from "./ILink";
import type { Particle } from "tsparticles-engine";

export type LinkParticle = Particle & {
    links: ILink[];
};
