import type { IParticle } from "tsparticles-engine";

export interface TextParticle extends IParticle {
    text?: string;
}
