import type { Particle } from "../../../Core";
import type { ILink } from "./ILink";

export type LinkParticle = Particle & {
    links: ILink[];
};
