import type { Main } from "tsparticles-core";
import { Parallax } from "./Parallax";

export function loadParticlesParallaxInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesParallax", (container) => new Parallax(container));
}
