import type { ILink } from "./ILink";
import type { Particle } from "../../../Core/Particle";

export type LinkParticle = Particle & {
    links: ILink[];
};
