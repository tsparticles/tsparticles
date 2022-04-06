import { circleBounce, circleBounceDataFromParticle } from "tsparticles-engine";
import type { Particle } from "tsparticles-engine";

export function bounce(p1: Particle, p2: Particle): void {
    circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
}
