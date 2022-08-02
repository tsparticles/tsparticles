import type { Links } from "./Links";
import type { ParticlesOptions } from "tsparticles-engine";

export type ParticlesLinkOptions = ParticlesOptions & {
    links?: Links;
};
