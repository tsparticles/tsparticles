import type { IParticle } from "tsparticles-engine";

export interface ISpiralParticle extends IParticle {
    spiralInnerRadius: number;
    spiralLineSpacing: number;
}
