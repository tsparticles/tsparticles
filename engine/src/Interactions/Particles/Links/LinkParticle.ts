import type { Particle } from "../../../Core/Particle";
import type { ILink } from "./ILink";

export type LinkParticle = Particle & {
    links: ILink[];
};
