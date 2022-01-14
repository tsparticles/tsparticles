import type { ILink } from "./ILink";
import type { Particle } from "../../../Core";

export type LinkParticle = Particle & {
    links: ILink[];
};
