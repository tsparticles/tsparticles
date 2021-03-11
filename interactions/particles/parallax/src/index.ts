import type { Main } from "tsparticles-engine";
import { Parallax } from "./Parallax";

export function loadParticlesParallaxInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesParallax", (container) => new Parallax(container));
}
