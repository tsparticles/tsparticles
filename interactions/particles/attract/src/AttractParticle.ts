import type { Particle } from "@tsparticles/engine";

export interface AttractParticle extends Particle {
    attractDistance?: number;
}
